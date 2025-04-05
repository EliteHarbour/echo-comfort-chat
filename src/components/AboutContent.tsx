
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, MessageCircle, FileText, Clipboard, Shield, Info } from "lucide-react";

const AboutContent = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <HeartPulse className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 gradient-text">About EchoComfort</h1>
        <p className="text-lg text-muted-foreground mb-6">
          EchoComfort is an AI-driven anonymous counseling platform designed to provide mental health support in a safe, private environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start space-x-4 pb-2">
            <MessageCircle className="h-5 w-5 text-primary mt-1" />
            <div>
              <CardTitle>AI Chat Support</CardTitle>
              <CardDescription>
                Instant, anonymous conversations focused on emotional wellbeing
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect with our AI counselor for immediate emotional support. No registration required, 
              and your conversations remain private. While our AI can provide coping strategies and 
              a compassionate ear, it's not a replacement for professional mental health care.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start space-x-4 pb-2">
            <FileText className="h-5 w-5 text-primary mt-1" />
            <div>
              <CardTitle>Personalized Resources</CardTitle>
              <CardDescription>
                Tailored mental health content generated just for you
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get customized mental health resources based on your specific needs. From anxiety 
              management techniques to mindfulness exercises, our AI creates personalized guidance 
              that you can download, save, and reference whenever you need support.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start space-x-4 pb-2">
            <Clipboard className="h-5 w-5 text-primary mt-1" />
            <div>
              <CardTitle>Self-Assessment</CardTitle>
              <CardDescription>
                Brief quizzes to help understand your mental wellbeing
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Take our quick self-assessment to gain insights into your current mental state.
              Based on your responses, you'll receive tailored recommendations for resources
              and coping strategies. All assessments are anonymous and designed for self-reflection,
              not diagnosis.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start space-x-4 pb-2">
            <Shield className="h-5 w-5 text-primary mt-1" />
            <div>
              <CardTitle>Privacy & Anonymity</CardTitle>
              <CardDescription>
                Your privacy is our highest priority
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              EchoComfort is built with privacy at its core. No account creation is required,
              and we don't store personal information. Your conversations are only saved in your
              browser's local storage and are cleared when you close the session or click "Clear Chat."
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            EchoComfort is not a replacement for professional mental health treatment. If you're experiencing
            a mental health emergency, please contact a crisis hotline immediately or visit your nearest
            emergency room. Our AI assistant can provide support and resources, but cannot diagnose
            conditions or provide medical advice.
          </p>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Emergency Resources:</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>National Suicide Prevention Lifeline:</strong> 1-800-273-8255</li>
              <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
              <li><strong>Emergency Services:</strong> Call 911 or your local emergency number</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutContent;
