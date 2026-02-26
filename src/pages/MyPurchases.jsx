import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Key, Mail, LogIn, Trash2, UserX } from "lucide-react";
import { format } from "date-fns";
import PullToRefresh from "@/components/PullToRefresh";

export default function MyPurchases() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    base44.auth.me()
      .then(u => {
        setUser(u);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const { data: purchases = [], isLoading: purchasesLoading, refetch } = useQuery({
    queryKey: ['myPurchases', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const allPurchases = await base44.entities.Purchase.filter({ customer_email: user.email }, '-created_date');
      return allPurchases;
    },
    enabled: !!user?.email
  });

  const deleteMutation = useMutation({
    mutationFn: (purchaseId) => base44.entities.Purchase.delete(purchaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPurchases'] });
    }
  });

  const handleDelete = (purchaseId) => {
    if (confirm('Are you sure you want to delete this purchase?')) {
      deleteMutation.mutate(purchaseId);
    }
  };

  // const handleDownloadReceipt = async (purchase) => {
  //   try {
  //     const response = await base44.functions.invoke('generateReceipt', { purchaseId: purchase.id });
  //     const blob = new Blob([response.data], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `Fanan-Team-Receipt-${purchase.id}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     a.remove();
  //   } catch (error) {
  //     alert('Failed to generate receipt: ' + error.message);
  //   }
  // };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <div className="bg-card border rounded-lg p-12">
          <LogIn className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-4">My Purchases</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view your purchase history and serial numbers.
          </p>
          <Button 
            onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
            className="bg-primary text-primary-foreground"
          >
            <LogIn className="mr-2 h-5 w-5" /> Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={async () => await refetch()}>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">My Purchases</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={async () => {
              if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                try {
                  await base44.entities.User.delete(user.id);
                  await base44.auth.logout();
                } catch (err) {
                  alert('Could not delete account. Please try again or contact support.');
                }
              }
            }}
          >
            <UserX className="w-4 h-4 mr-2" /> Delete Account
          </Button>
        </div>

        {purchasesLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your purchases...</p>
          </div>
        ) : purchases.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No purchases found for this email.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      {purchase.pack_name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary">
                        ${purchase.amount_paid.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(purchase.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-lg border border-secondary">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Serial Number
                    </p>
                    <p className="text-2xl font-bold text-primary font-mono tracking-wider">
                      {purchase.serial_number}
                    </p>
                  </div>

                  {purchase.machine_id && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Machine ID</p>
                        <p className="font-semibold">{purchase.machine_id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Customer Name</p>
                        <p className="font-semibold">{purchase.customer_name || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="w-3 h-3" />
                    Purchased on {format(new Date(purchase.created_date), 'PPP')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </PullToRefresh>
  );
}