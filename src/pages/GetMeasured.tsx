
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Camera, Upload, User, Ruler, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GetMeasured = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [sidePhoto, setSidePhoto] = useState<string | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [measurements, setMeasurements] = useState<any>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'side') => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          if (type === 'front') {
            setFrontPhoto(result);
            toast({
              title: "Front Photo Uploaded",
              description: "Front view photo uploaded successfully",
            });
          } else {
            setSidePhoto(result);
            toast({
              title: "Side Photo Uploaded", 
              description: "Side view photo uploaded successfully",
            });
          }
        }
      };
      reader.onerror = () => {
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const processMeasurements = () => {
    if (!frontPhoto || !sidePhoto || !height || !weight) {
      toast({
        title: "Missing Information",
        description: "Please provide both photos, height, and weight",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI processing
    setTimeout(() => {
      const calculatedMeasurements = {
        chest: (parseFloat(height) * 0.52 + Math.random() * 4).toFixed(1),
        waist: (parseFloat(height) * 0.47 + Math.random() * 4).toFixed(1),
        shoulder: (parseFloat(height) * 0.26 + Math.random() * 2).toFixed(1),
        armLength: (parseFloat(height) * 0.38 + Math.random() * 2).toFixed(1),
        neckSize: (parseFloat(height) * 0.22 + Math.random() * 1.5).toFixed(1),
        shirtLength: (parseFloat(height) * 0.42 + Math.random() * 3).toFixed(1),
      };

      setMeasurements(calculatedMeasurements);
      setStep(3);

      toast({
        title: "Measurements Calculated",
        description: "AI has successfully analyzed your photos and calculated your measurements",
      });
    }, 3000);

    setStep(2);
  };

  const saveMeasurements = () => {
    toast({
      title: "Measurements Saved",
      description: "Your measurements have been saved to your profile",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Measured</h1>
          <p className="text-xl opacity-90">
            AI-powered measurement system for perfect fit
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    step >= stepNumber ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-20 h-1 ${
                      step > stepNumber ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Photo Upload */}
        {step === 1 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Your Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Front Photo */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Front View Photo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      {frontPhoto ? (
                        <div className="space-y-4">
                          <img
                            src={frontPhoto}
                            alt="Front view"
                            className="w-32 h-48 object-cover mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600 font-medium">Front photo uploaded</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <User className="h-16 w-16 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium mb-2">Upload Front View</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Stand straight, arms at sides, facing camera
                            </p>
                          </div>
                        </div>
                      )}
                      <label htmlFor="front-photo" className="cursor-pointer">
                        <Button variant="outline" className="mt-4" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          {frontPhoto ? "Change Photo" : "Upload Photo"}
                        </Button>
                      </label>
                      <input
                        id="front-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'front')}
                      />
                    </div>
                  </div>

                  {/* Side Photo */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Side View Photo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      {sidePhoto ? (
                        <div className="space-y-4">
                          <img
                            src={sidePhoto}
                            alt="Side view"
                            className="w-32 h-48 object-cover mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600 font-medium">Side photo uploaded</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <User className="h-16 w-16 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium mb-2">Upload Side View</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Stand straight, arms at sides, profile view
                            </p>
                          </div>
                        </div>
                      )}
                      <label htmlFor="side-photo" className="cursor-pointer">
                        <Button variant="outline" className="mt-4" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          {sidePhoto ? "Change Photo" : "Upload Photo"}
                        </Button>
                      </label>
                      <input
                        id="side-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, 'side')}
                      />
                    </div>
                  </div>
                </div>

                {/* Height and Weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full mt-8"
                  onClick={processMeasurements}
                  disabled={!frontPhoto || !sidePhoto || !height || !weight}
                >
                  <Ruler className="h-4 w-4 mr-2" />
                  Analyze & Calculate Measurements
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 2 && (
          <Card>
            <CardContent className="text-center py-16">
              <div className="animate-spin h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-8"></div>
              <h3 className="text-2xl font-bold mb-4">Analyzing Your Photos</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is processing your photos to calculate precise measurements...
              </p>
              <div className="max-w-md mx-auto space-y-2 text-sm">
                <p>✓ Detecting body landmarks</p>
                <p>✓ Calculating proportions</p>
                <p>✓ Generating measurements</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && measurements && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Your Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Chest:</span>
                    <span className="font-bold">{measurements.chest} inches</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Waist:</span>
                    <span className="font-bold">{measurements.waist} inches</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Shoulder:</span>
                    <span className="font-bold">{measurements.shoulder} inches</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Arm Length:</span>
                    <span className="font-bold">{measurements.armLength} inches</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Neck Size:</span>
                    <span className="font-bold">{measurements.neckSize} inches</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Shirt Length:</span>
                    <span className="font-bold">{measurements.shirtLength} inches</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Accuracy Notice</h4>
                <p className="text-sm text-blue-800">
                  These measurements are calculated using AI analysis. For the most accurate results,
                  we recommend having a professional tailor verify these measurements.
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={saveMeasurements} className="flex-1">
                  Save Measurements
                </Button>
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Retake Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GetMeasured;
