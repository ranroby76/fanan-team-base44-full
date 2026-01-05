import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Key, Mail, LogIn } from "lucide-react";
import { format } from "date-fns";

export default function MyPurchases() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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

  const { data: purchases = [], isLoading: purchasesLoading } = useQuery({
    queryKey: ['myPurchases', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const allPurchases = await base44.entities.Purchase.filter({ customer_email: user.email }, '-created_date');
      return allPurchases;
    },
    enabled: !!user?.email
  });

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Purchases</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
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
                    <span className="text-lg font-bold text-primary">
                      ${purchase.amount_paid.toFixed(2)}
                    </span>
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
  );
}