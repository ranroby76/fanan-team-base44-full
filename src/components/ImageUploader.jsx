import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedUrl(file_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="font-semibold text-lg">Upload Image to Base44 Storage</h3>
      <p className="text-sm text-muted-foreground">
        Upload images here to get reliable, permanent URLs for your products.
      </p>

      <div className="flex gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="flex-1"
        />
        {uploading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
      </div>

      {uploadedUrl && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input value={uploadedUrl} readOnly className="flex-1 font-mono text-xs" />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copy URL"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <img
            src={uploadedUrl}
            alt="Uploaded preview"
            className="w-full max-h-48 object-contain rounded border bg-muted"
          />
        </div>
      )}
    </div>
  );
}