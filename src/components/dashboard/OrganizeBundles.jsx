import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function OrganizeBundles({ products, packs }) {
  const [packProducts, setPackProducts] = React.useState({});
  const queryClient = useQueryClient();

  // Initialize pack products with proper ordering
  React.useEffect(() => {
    const grouped = {};
    packs.forEach(pack => {
      const items = products
        .filter(p => p.pack === pack && !p.is_hidden)
        .sort((a, b) => (a.display_order || 999) - (b.display_order || 999));
      grouped[pack] = items;
    });
    setPackProducts(grouped);
  }, [products, packs]);

  const saveOrderMutation = useMutation({
    mutationFn: async ({ packName, orderedProducts }) => {
      console.log(`Saving order for ${packName}:`, orderedProducts.map((p, i) => `[${i}] ${p.title}`));
      
      // Update display_order for each product
      for (let i = 0; i < orderedProducts.length; i++) {
        const product = orderedProducts[i];
        console.log(`Updating ${product.title} (${product.id}) to display_order: ${i}`);
        await base44.entities.Product.update(product.id, { display_order: i });
      }
      
      // Verify the updates by fetching fresh data
      const { data: freshProducts } = await base44.functions.invoke('getProducts');
      const packProducts = freshProducts.filter(p => p.pack === packName);
      console.log(`After save - ${packName} products:`, packProducts.map(p => `${p.title}: display_order=${p.display_order}`));
      
      return { packName };
    },
    onSuccess: async (data) => {
      console.log('Save successful, invalidating caches...');
      
      // Clear all product-related caches - use predicate to match any query starting with 'products'
      queryClient.invalidateQueries({ 
        predicate: (query) => query.queryKey[0] === 'products' 
      });
      
      toast.success(`Order saved for ${data.packName}!`);
    },
    onError: (error) => {
      console.error('Save failed:', error);
      toast.error("Failed to save order: " + error.message);
    }
  });

  const handleDragEnd = (result, packName) => {
    if (!result.destination) return;

    const items = Array.from(packProducts[packName]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPackProducts(prev => ({
      ...prev,
      [packName]: items
    }));
  };

  const handleSaveOrder = (packName) => {
    saveOrderMutation.mutate({ 
      packName, 
      orderedProducts: packProducts[packName] 
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-primary">Organize Bundles</h1>
        <p className="text-muted-foreground">Drag and drop to reorder products in each pack gallery</p>
      </div>

      {packs.map(packName => {
        const items = packProducts[packName] || [];
        if (items.length === 0) return null;

        return (
          <Card key={packName}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{packName}</CardTitle>
              <Button 
                onClick={() => handleSaveOrder(packName)}
                disabled={saveOrderMutation.isPending}
                size="sm"
              >
                {saveOrderMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Order
              </Button>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={(result) => handleDragEnd(result, packName)}>
                <Droppable droppableId={packName}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-2 ${snapshot.isDraggingOver ? 'bg-muted/30' : ''}`}
                    >
                      {items.map((product, index) => (
                        <Draggable 
                          key={product.id} 
                          draggableId={product.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-4 p-4 bg-card border rounded-lg transition-all ${
                                snapshot.isDragging 
                                  ? 'shadow-lg scale-105 border-primary' 
                                  : 'hover:shadow-md hover:border-primary/50'
                              }`}
                            >
                              <GripVertical className="w-5 h-5 text-muted-foreground shrink-0" />
                              
                              {product.main_image && (
                                <img 
                                  src={product.main_image} 
                                  alt={product.title}
                                  className="w-20 h-20 object-cover rounded border bg-muted shrink-0"
                                />
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {product.short_description || 'No description'}
                                </p>
                              </div>

                              <div className="text-sm text-muted-foreground shrink-0">
                                #{index + 1}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}