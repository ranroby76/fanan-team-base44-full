import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Edit, Plus, Loader2, Wand2, CheckCircle2, XCircle, Link2 } from "lucide-react";
import EditProduct from "../components/dashboard/EditProduct";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [selectedPack, setSelectedPack] = useState("Mad MIDI Machines");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [linkingFormulas, setLinkingFormulas] = useState(false);
  const [linkResults, setLinkResults] = useState(null);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(undefined, 100),
    initialData: [],
  });

  const { data: packPrices = [] } = useQuery({
    queryKey: ['packPrices'],
    queryFn: () => base44.entities.PackPrice.list(),
  });

  const packs = ["Mad MIDI Machines", "Max! Pack", "Free Pack"];

  const handleAutoLinkFormulas = async () => {
    setLinkingFormulas(true);
    setLinkResults(null);
    try {
      const response = await base44.functions.invoke('autoLinkSerialFormulas');
      setLinkResults(response.data);
      queryClient.invalidateQueries({ queryKey: ['packPrices'] });
    } catch (error) {
      setLinkResults({ error: error.message });
    }
    setLinkingFormulas(false);
  };

  const filteredProducts = products
    .filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.pack === selectedPack
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Manage your application data</p>
        </div>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>Manage your VST plugins and packs</CardDescription>
              </div>
              
              <div className="flex gap-2 bg-muted/20 p-1 rounded-lg">
                {packs.map(pack => (
                  <Button
                    key={pack}
                    size="sm"
                    variant={selectedPack === pack ? "default" : "ghost"}
                    onClick={() => setSelectedPack(pack)}
                    className={`text-xs font-medium ${selectedPack === pack ? 'shadow-sm' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {pack}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                 <Button onClick={() => setEditingProduct({})} size="sm" className="hidden md:flex">
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-8 h-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>


              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="hidden md:table-cell">Formats</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow 
                        key={product.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setEditingProduct(product)}
                      >
                        <TableCell>
                          {product.main_image && (
                            <img 
                              src={product.main_image} 
                              alt={product.title} 
                              className="h-10 w-10 object-cover rounded bg-muted"
                            />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {product.short_description}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {(product.formats || []).slice(0, 3).map(fmt => (
                              <span key={fmt} className="text-xs bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                                {fmt}
                              </span>
                            ))}
                            {(product.formats || []).length > 3 && (
                              <span className="text-xs text-muted-foreground">+{product.formats.length - 3}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No products found in this pack matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>User management coming soon.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                Serial Formula Linking
              </CardTitle>
              <CardDescription>
                Automatically link serial formula secrets to their matching packs using AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleAutoLinkFormulas} 
                disabled={linkingFormulas}
                className="gap-2"
              >
                {linkingFormulas ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {linkingFormulas ? "Linking..." : "Auto-Link Serial Formulas"}
              </Button>
              
              {linkResults && !linkResults.error && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{linkResults.message}</p>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pack</TableHead>
                          <TableHead>Linked Secret</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {linkResults.results?.map((result, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{result.pack}</TableCell>
                            <TableCell className="text-xs font-mono">
                              {result.linked_to || "—"}
                            </TableCell>
                            <TableCell>
                              {result.status === "updated" && (
                                <span className="flex items-center gap-1 text-green-500 text-sm">
                                  <CheckCircle2 className="w-4 h-4" /> Updated
                                </span>
                              )}
                              {result.status === "already_linked" && (
                                <span className="flex items-center gap-1 text-blue-500 text-sm">
                                  <CheckCircle2 className="w-4 h-4" /> Already Linked
                                </span>
                              )}
                              {result.status === "no_match" && (
                                <span className="flex items-center gap-1 text-yellow-500 text-sm">
                                  <XCircle className="w-4 h-4" /> No Match
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              {linkResults?.error && (
                <p className="text-sm text-destructive">{linkResults.error}</p>
              )}

              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Current Pack Configurations</h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pack Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Serial Formula Secret</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packPrices.map((pack) => (
                        <TableRow key={pack.id}>
                          <TableCell className="font-medium">{pack.pack_name}</TableCell>
                          <TableCell>${pack.price?.toFixed(2)}</TableCell>
                          <TableCell className="text-xs font-mono">
                            {pack.serial_formula_secret || <span className="text-muted-foreground">Not linked</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {editingProduct && (
        <EditProduct 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
        />
      )}
    </div>
  );
}