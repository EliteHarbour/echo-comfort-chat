
import Layout from "@/components/Layout";
import SelfAssessmentQuiz from "@/components/SelfAssessmentQuiz";

const Assessment = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mental Health Self-Assessment</h1>
        <SelfAssessmentQuiz />
      </div>
    </Layout>
  );
};

export default Assessment;
