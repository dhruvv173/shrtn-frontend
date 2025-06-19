import { Button } from "./ui/button";
import { ThemeProvider } from "./theme-provider";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Spinner } from "@/components/ui/spinner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function UrlInputForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShorturl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
    setShorturl(null);
  };
  async function handleClick() {
    setLoading(true);
    setShorturl(null);
    try {
      const response = await axios.post(
        "https://shrtn-aueb.onrender.com/api/create",
        {
          originalUrl: url,
        }
      );
      const newShortUrl = response.data.shortUrl;
      setShorturl(newShortUrl);
      setUrl("");
      setIsDialogOpen(true);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="grid max-w-sm items-center gap-2">
          <Textarea
            placeholder="Paste your URL here"
            className="w-[320px]"
            value={url}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer"
            onClick={handleClick}
            disabled={!url.trim() || loading}
          >
            {loading ? <Spinner /> : "Generate"}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Your link is ready! 🎉</DialogTitle>
                <DialogDescription>
                  Anyone with this link will be able to view your original URL.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="shortLink" className="sr-only">
                    Short Link
                  </Label>
                  <Input
                    id="shortLink"
                    value={shortUrl} // Ensure it's not null
                    readOnly
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="px-3 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    // Optionally show a "Copied!" message
                  }}
                >
                  <span className="sr-only">Copy</span>
                  Copy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default UrlInputForm;
