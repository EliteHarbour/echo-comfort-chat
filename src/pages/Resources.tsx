
import Layout from "@/components/Layout";
import ResourceGenerator from "@/components/ResourceGenerator";

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mental Health Resources</h1>
        <p className="text-gray-600 mb-6">
          Generate personalized resources for various mental health concerns or create your own custom resource by selecting "Custom Resource" and entering a specific prompt. All resources are AI-generated based on your inputs.
        </p>
        <div className="bg-mint-50 dark:bg-mint-900/50 rounded-lg p-4 mb-6 border border-mint-200 dark:border-mint-800">
          <h2 className="text-lg font-medium mb-2 text-primary">Create Your Own Custom Resources</h2>
          <p className="text-sm text-muted-foreground">
            Select "Custom Resource" from the dropdown menu and enter any prompt to create completely personalized mental health content tailored to your specific needs. Try prompts like "Create a 5-minute anxiety-relief exercise" or "Write a guide for managing workplace stress".
          </p>
        </div>
        <ResourceGenerator />
      </div>
    </Layout>
  );
};

export default Resources;
