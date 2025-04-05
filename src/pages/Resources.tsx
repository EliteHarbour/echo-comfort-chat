
import Layout from "@/components/Layout";
import ResourceGenerator from "@/components/ResourceGenerator";
import { FileText, Sparkles } from "lucide-react";

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Mental Health Resources
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Generate personalized resources for various mental health concerns or create your own custom resource by selecting "Custom Resource" and entering a specific prompt. All resources are AI-generated based on your inputs.
          </p>
        </div>

        <div className="bg-gradient-to-r from-mint-50/80 to-mint-100/50 dark:from-mint-900/50 dark:to-mint-800/30 rounded-lg p-6 mb-8 border border-mint-200 dark:border-mint-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-primary">Create Your Own Custom Resources</h2>
              <p className="text-muted-foreground">
                Select "Custom Resource" from the dropdown menu and enter any prompt to create completely personalized mental health content tailored to your specific needs.
              </p>
              <div className="mt-4 p-3 bg-background/80 dark:bg-background/30 rounded-md border border-border/50 text-sm">
                <p className="font-medium mb-1">Try prompts like:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>"Create a 5-minute anxiety-relief breathing exercise"</li>
                  <li>"Write a guide for managing workplace stress during busy periods"</li>
                  <li>"Develop a morning routine for improving mental clarity"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ResourceGenerator />
      </div>
    </Layout>
  );
};

export default Resources;
