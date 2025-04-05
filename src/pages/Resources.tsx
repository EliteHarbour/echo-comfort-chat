
import Layout from "@/components/Layout";
import ResourceGenerator from "@/components/ResourceGenerator";

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mental Health Resources</h1>
        <p className="text-gray-600 mb-6">
          Generate personalized resources for various mental health concerns or create your own custom resource by selecting "Custom Resource" and entering a specific prompt.
        </p>
        <ResourceGenerator />
      </div>
    </Layout>
  );
};

export default Resources;
