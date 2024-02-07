import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your library</h1>
      <Tabs defaultValue="your-games" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="your-games">Games</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="your-games">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="wishlist">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
