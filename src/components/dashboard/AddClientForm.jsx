import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddClientForm({ onClose, packs }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [selectedPacks, setSelectedPacks] = useState({});

  const handlePackToggle = (packName, checked) => {
    if (checked) {
      setSelectedPacks({ ...selectedPacks, [packName]: [{ id: "", serial: "" }] });
    } else {
      const newPacks = { ...selectedPacks };
      delete newPacks[packName];
      setSelectedPacks(newPacks);
    }
  };

  const handleAddLicense = (packName) => {
    setSelectedPacks({
      ...selectedPacks,
      [packName]: [...selectedPacks[packName], { id: "", serial: "" }]
    });
  };

  const handleRemoveLicense = (packName, index) => {
    const newLicenses = [...selectedPacks[packName]];
    newLicenses.splice(index, 1);
    if (newLicenses.length === 0) {
      handlePackToggle(packName, false);
    } else {
      setSelectedPacks({ ...selectedPacks, [packName]: newLicenses });
    }
  };

  const handleLicenseChange = (packName, index, field, value) => {
    const newLicenses = [...selectedPacks[packName]];
    newLicenses[index][field] = value;
    setSelectedPacks({ ...selectedPacks, [packName]: newLicenses });
  };

  const addClientMutation = useMutation({
    mutationFn: async () => {
      // Create purchases
      const purchases = [];
      for (const [packName, licenses] of Object.entries(selectedPacks)) {
        for (const license of licenses) {
          if (license.serial) {
            purchases.push({
              customer_email: email,
              customer_name: name,
              pack_name: packName,
              serial_number: license.serial,
              machine_id: license.id || "",
              amount_paid: 0,
              paypal_order_id: "MANUAL_ENTRY_" + Date.now(),
            });
          }
        }
      }

      if (purchases.length > 0) {
        await base44.entities.Purchase.bulkCreate(purchases);
      }
      
      // Try to invite user so they can log in to view their licenses
      try {
        await base44.users.inviteUser(email, "user");
      } catch (err) {
        console.warn("User might already exist or invite failed", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client and licenses added successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to add client: " + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Name and Email are required");
      return;
    }
    
    // Check if at least one pack is selected and has serial
    const hasAnySerial = Object.values(selectedPacks).some(licenses => 
      licenses.some(l => l.serial.trim() !== "")
    );
    
    if (!hasAnySerial && Object.keys(selectedPacks).length > 0) {
      toast.error("Please enter a serial number for the selected packs");
      return;
    }

    addClientMutation.mutate();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Past Client</DialogTitle>
          <DialogDescription>
            Manually add a client and their pack licenses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Login Password</Label>
                <div className="relative">
                  <Input disabled value="Auto-generated via Invite Link" className="bg-muted text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  For security, an invite link will be sent to the user's email for them to securely set their password.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-lg">Select Packs & Licenses</Label>
                
                <div className="space-y-4">
                  {packs.map(packName => {
                    const isSelected = !!selectedPacks[packName];
                    const licenses = selectedPacks[packName] || [];

                    return (
                      <div key={packName} className={`p-4 border rounded-lg transition-colors ${isSelected ? 'border-primary/50 bg-primary/5' : ''}`}>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`pack-${packName}`} 
                            checked={isSelected}
                            onCheckedChange={(checked) => handlePackToggle(packName, checked)}
                          />
                          <Label htmlFor={`pack-${packName}`} className="font-semibold cursor-pointer">
                            {packName}
                          </Label>
                        </div>

                        {isSelected && (
                          <div className="mt-4 space-y-4 pl-6 border-l-2 border-primary/20 ml-2">
                            {licenses.map((license, idx) => (
                              <div key={idx} className="flex items-end gap-3 bg-background p-3 rounded border shadow-sm">
                                <div className="flex-1 space-y-1">
                                  <Label className="text-xs text-muted-foreground">Machine ID</Label>
                                  <Input 
                                    placeholder="Optional Machine ID" 
                                    value={license.id} 
                                    onChange={(e) => handleLicenseChange(packName, idx, 'id', e.target.value)}
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <Label className="text-xs text-muted-foreground">Serial Number *</Label>
                                  <Input 
                                    required
                                    placeholder="Serial Number" 
                                    value={license.serial} 
                                    onChange={(e) => handleLicenseChange(packName, idx, 'serial', e.target.value)}
                                  />
                                </div>
                                <Button type="button" variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => handleRemoveLicense(packName, idx)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleAddLicense(packName)}
                              className="text-xs"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add another ID and serial for additional license
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-end gap-2 pt-4 border-t mt-auto">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={addClientMutation.isPending}>
              {addClientMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}