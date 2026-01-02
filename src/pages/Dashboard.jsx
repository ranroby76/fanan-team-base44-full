import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Edit, Plus, Loader2 } from "lucide-react";
import EditProduct from "../components/dashboard/EditProduct";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list({ limit: 100 }), // Get all products
    initialData: [],
  });

  const packs = ["Mad MIDI Machines", "Max! Pack", "Free Pack"];

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>Manage your VST plugins and packs</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Mad MIDI Machines">
                <TabsList className="mb-4">
                  {packs.map(pack => (
                    <TabsTrigger key={pack} value={pack}>{pack}</TabsTrigger>
                  ))}
                </TabsList>
                
                {packs.map(pack => (
                  <TabsContent key={pack} value={pack}>
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
                          {filteredProducts
                            .filter(p => p.pack === pack)
                            .map((product) => (
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
                          {filteredProducts.filter(p => p.pack === pack).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                No products found in this pack.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
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

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>App configuration coming soon.</CardDescription>
            </CardHeader>
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