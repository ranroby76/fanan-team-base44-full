import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Edit, Plus, Loader2, Lock } from "lucide-react";
import EditProduct from "../components/dashboard/EditProduct";

export default function ProductManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);

  const [activeTab, setActiveTab] = useState("products");
  const [selectedPack, setSelectedPack] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [madMidiPrice, setMadMidiPrice] = useState("22.00");
  const [maxPackPrice, setMaxPackPrice] = useState("12.00");

  const queryClient = useQueryClient();

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products-admin'],
    queryFn: async () => {
        // Using direct entity list for admin management to ensure we see everything
        const res = await base44.entities.Product.list(undefined, 1000);
        return res;
    },
    initialData: [],
  });

  const packs = ["Mad MIDI Machines", "Max! Pack", "Free Pack"];

  // Deduplicate products by title to avoid showing duplicates from double seeding
  const uniqueProducts = React.useMemo(() => {
    const seen = new Set();
    return products.filter(p => {
      if (!p.title) return false;
      const duplicate = seen.has(p.title);
      seen.add(p.title);
      return !duplicate;
    });
  }, [products]);

  const filteredProducts = uniqueProducts
    .filter(p => {
        const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPack = selectedPack === "all" || p.pack === selectedPack;
        return matchesSearch && matchesPack;
    })
    .sort((a, b) => a.title?.localeCompare(b.title));

  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError("");

    try {
      const response = await base44.functions.invoke('verifyVipPass', { password });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Incorrect password");
    } finally {
      setVerifying(false);
    }
  };

  const handleImportFromGitHub = async () => {
    setImporting(true);
    try {
      const response = await base44.functions.invoke('importProductsFromGitHub');
      if (response.data.success) {
        alert(`Successfully imported ${response.data.imported} products!`);
        refetch();
      } else {
        alert('Import failed: ' + response.data.error);
      }
    } catch (err) {
      alert('Import failed: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  // Show password input if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <Lock className="w-16 h-16 text-primary" />
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">VIP Access</h1>
          <p className="text-muted-foreground">Enter password to access product management</p>
        </div>
        <form onSubmit={handleVerifyPassword} className="w-full max-w-sm space-y-4">
          <Input
            type="password"
            placeholder="Enter VIP password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            disabled={verifying}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button 
            type="submit"
            size="lg"
            className="w-full"
            disabled={verifying || !password}
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Access"}
          </Button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Vertical Tab Sidebar */}
      <div className="w-64 bg-card border-r border-border p-4 space-y-2">
        <Button
          variant={activeTab === "products" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("products")}
        >
          Product Manager
        </Button>
        <Button
          variant={activeTab === "pricing" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("pricing")}
        >
          Set Price
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-8">
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold font-headline text-primary">Product Manager</h1>
                <p className="text-muted-foreground">Manage your application data directly</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleImportFromGitHub} variant="default" size="sm" disabled={importing}>
                  {importing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Import from GitHub
                </Button>
                <Button onClick={() => refetch()} variant="outline" size="sm">
                  Refresh Data
                </Button>
              </div>
            </div>

            <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>
                {filteredProducts.length} products found
            </CardDescription>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="flex gap-2 bg-muted/20 p-1 rounded-lg">
              <Button
                size="sm"
                variant={selectedPack === "all" ? "default" : "ghost"}
                onClick={() => setSelectedPack("all")}
                className="text-xs"
              >
                All
              </Button>
              {packs.map(pack => (
                <Button
                  key={pack}
                  size="sm"
                  variant={selectedPack === pack ? "default" : "ghost"}
                  onClick={() => setSelectedPack(pack)}
                  className={`text-xs ${selectedPack === pack ? '' : 'opacity-70'}`}
                >
                  {pack}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search..." 
                    className="pl-8 h-9 w-[200px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setEditingProduct({})} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add New
                </Button>
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
                  <TableHead>Pack</TableHead>
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
                      {product.main_image ? (
                        <img 
                          src={product.main_image} 
                          alt={product.title} 
                          className="h-10 w-10 object-cover rounded bg-muted"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-xs">No Img</div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.title}
                        <div className="text-xs text-muted-foreground md:hidden">{product.pack}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {product.pack}
                        </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {(product.formats || []).slice(0, 3).map(fmt => (
                          <span key={fmt} className="text-xs border px-1 rounded text-muted-foreground">
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
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingProduct && (
        <EditProduct 
          product={editingProduct} 
          onClose={() => {
              setEditingProduct(null);
              refetch();
          }} 
        />
      )}
          </>
        )}

        {activeTab === "pricing" && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-headline text-primary">Set Pack Prices</h1>
              <p className="text-muted-foreground">Update pricing for each pack</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pack Pricing</CardTitle>
                <CardDescription>Modify the prices for Mad MIDI Machines Pack and Max Pack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Mad MIDI Machines Pack</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">$</span>
                    <Input 
                      type="number" 
                      value={madMidiPrice}
                      onChange={(e) => setMadMidiPrice(e.target.value)}
                      step="0.01"
                      className="text-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Max Pack</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">$</span>
                    <Input 
                      type="number" 
                      value={maxPackPrice}
                      onChange={(e) => setMaxPackPrice(e.target.value)}
                      step="0.01"
                      className="text-xl"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSavePrices}
                  disabled={savePriceMutation.isLoading}
                >
                  {savePriceMutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Prices
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}