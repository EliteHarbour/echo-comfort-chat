
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Download, RefreshCcw } from "lucide-react";
import { generateResource } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const resourceTypes = [
  {
    value: "anxiety-coping",
    label: "Anxiety Coping Strategies",
  },
  {
    value: "depression-management",
    label: "Depression Management",
  },
  {
    value: "stress-reduction",
    label: "Stress Reduction Techniques",
  },
  {
    value: "mindfulness-exercises",
    label: "Mindfulness Exercises",
  },
  {
    value: "sleep-improvement",
    label: "Sleep Improvement",
  },
  {
    value: "self-care-routines",
    label: "Self-Care Routines",
  },
  {
    value: "emotional-regulation",
    label: "Emotional Regulation",
  },
  {
    value: "custom",
    label: "Custom Resource",
  },
];

const ResourceGenerator = () => {
  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [userConcern, setUserConcern] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResource, setGeneratedResource] = useState("");
  const { toast } = useToast();

  const handleGenerateResource = async () => {
    if (!selectedResourceType) {
      toast({
        description: "Please select a resource type.",
        variant: "destructive",
      });
      return;
    }

    if (selectedResourceType === "custom" && !customPrompt) {
      toast({
        description: "Please enter a custom prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      let resource;
      
      if (selectedResourceType === "custom") {
        // Generate resource based on custom prompt
        resource = await generateResource(customPrompt);
      } else {
        // Generate resource based on selected type
        const selectedType = resourceTypes.find(
          (type) => type.value === selectedResourceType
        )?.label;

        if (!selectedType) return;

        resource = await generateResource(
          selectedType,
          userConcern || undefined
        );
      }

      setGeneratedResource(resource);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate resource. Please try again.",
        variant: "destructive",
      });
      console.error("Resource generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadResource = () => {
    if (!generatedResource) return;

    let filename;
    if (selectedResourceType === "custom") {
      filename = "custom-resource.md";
    } else {
      const selectedTypeLabel = resourceTypes.find(
        (type) => type.value === selectedResourceType
      )?.label;
      filename = `${
        selectedTypeLabel?.toLowerCase().replace(/\s+/g, "-") || "resource"
      }.md`;
    }

    const element = document.createElement("a");
    const file = new Blob([generatedResource], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      description: "Resource downloaded successfully",
    });
  };

  const resetForm = () => {
    setSelectedResourceType("");
    setUserConcern("");
    setCustomPrompt("");
    setGeneratedResource("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Generate a Resource</CardTitle>
          <CardDescription>
            Select a resource type and optionally describe your concern to get
            personalized content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="resource-type"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Resource Type
            </label>
            <Select
              value={selectedResourceType}
              onValueChange={setSelectedResourceType}
            >
              <SelectTrigger id="resource-type">
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedResourceType === "custom" ? (
            <div className="space-y-2">
              <label
                htmlFor="custom-prompt"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Custom Prompt
              </label>
              <Input
                id="custom-prompt"
                placeholder="E.g., Create a guide for managing social anxiety at work"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="concern"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Your Concern (Optional)
              </label>
              <Input
                id="concern"
                placeholder="E.g., work stress, social anxiety"
                value={userConcern}
                onChange={(e) => setUserConcern(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleGenerateResource}
            disabled={isGenerating || !selectedResourceType}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Resource"
            )}
          </Button>
          {generatedResource && (
            <Button
              className="w-full"
              variant="outline"
              onClick={resetForm}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Create Another
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="col-span-1 md:col-span-5">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {generatedResource
                ? selectedResourceType === "custom"
                  ? "Custom Resource"
                  : resourceTypes.find((type) => type.value === selectedResourceType)
                      ?.label || "Generated Resource"
                : "Resource Preview"}
            </CardTitle>
            <CardDescription>
              {generatedResource
                ? "Your personalized resource is ready."
                : "Generated content will appear here."}
            </CardDescription>
          </div>
          {generatedResource && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownloadResource}
              className="ml-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] rounded-md border p-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Generating your personalized resource...</p>
                <p className="text-sm">This may take a moment.</p>
              </div>
            ) : generatedResource ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{generatedResource}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <p className="mb-2">Select a resource type and click "Generate Resource"</p>
                <p className="text-sm">
                  Your personalized mental health resource will appear here.
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceGenerator;
