
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, ClipboardCheck, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight gradient-text">
            Anonymous Mental Health Support
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Access AI-powered emotional support, resources, and self-assessment tools. 
            No sign-up required, completely anonymous, and always here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/chat">
                Talk to AI Counselor <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="hover-card">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">AI Chat Support</h2>
              <p className="text-muted-foreground mb-4">
                Have a conversation with our AI counselor. Share your thoughts and receive supportive guidance.
              </p>
              <Button asChild variant="link" className="px-0">
                <Link to="/chat" className="flex items-center gap-1">
                  Start chatting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Personalized Resources</h2>
              <p className="text-muted-foreground mb-4">
                Generate tailored mental health resources including coping strategies and mindfulness exercises.
              </p>
              <Button asChild variant="link" className="px-0">
                <Link to="/resources" className="flex items-center gap-1">
                  Get resources <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Self-Assessment</h2>
              <p className="text-muted-foreground mb-4">
                Take a quick assessment to understand your mental wellbeing and receive personalized recommendations.
              </p>
              <Button asChild variant="link" className="px-0">
                <Link to="/assessment" className="flex items-center gap-1">
                  Take assessment <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-mint-100 to-teal-100 dark:from-mint-900 dark:to-teal-900 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Your Journey to Better Mental Health
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            EchoComfort provides a safe space for emotional support and self-discovery. 
            No registration, no data collection—just support when you need it.
          </p>
          <Button asChild size="lg">
            <Link to="/chat">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
