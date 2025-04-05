
import Layout from "@/components/Layout";
import ResourceGenerator from "@/components/ResourceGenerator";

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mental Health Resources</h1>
        <ResourceGenerator />
      </div>
    </Layout>
  );
};

export default Resources;
