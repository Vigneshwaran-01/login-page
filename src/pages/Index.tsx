import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Mail, Lock, User, Eye, EyeOff, Server, Shield, Cloud, CheckCircle, ArrowRight, ArrowLeft, Building2, Phone, MapPin, Globe, Database, Zap, HardDrive, Facebook } from "lucide-react"; // Added icons


const Index = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [index, setIndex] = useState(0);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [OTP, setOTP] = useState("");
  const [showEmailInputForOTP, setShowEmailInputForOTP] = useState(false); // Track if email input is shown for OTP
    const [emailForOTP, setEmailForOTP] = useState("");

  const carouselCards = [
    {
      id: 1,
      title: "https://res.cloudinary.com/dqobnxxos/image/upload/v1751701958/Yellow_Illustrative_Web_Design_Promotion_Banner_tzilfm.png",
      subtitle: "Professional Email Solutions",
      description: "Secure, reliable email hosting with enterprise-grade features and 99.9% uptime guarantee.",
      mockData: {
        title: "Email Management",
        totalEmails: "2,847",
        bgColor: "bg-blue-200",
        accentColor: "text-blue-600"
      }
    },
    {
      id: 2,
      title: "https://res.cloudinary.com/dqobnxxos/image/upload/v1751701949/Blue_and_Yellow_Modern_Hiring_Team_Banner_pidazi.png",
      subtitle: "Seamless Team Communication",
      description: "Boost productivity with integrated calendar, contacts, and tasks.",
      mockData: {
        title: "Team Collaboration",
        totalTasks: "156",
        bgColor: "bg-green-200",
        accentColor: "text-green-600"
      }
    },
    {
      id: 3,
      title: "https://res.cloudinary.com/dqobnxxos/image/upload/v1751701958/Yellow_Illustrative_Web_Design_Promotion_Banner_tzilfm.png",
      subtitle: "Advanced Protection for Your Data",
      description: "Protect your emails with advanced security and spam protection features.",
      mockData: {
        title: "Security Alerts",
        totalAlerts: "3",
        bgColor: "bg-red-200",
        accentColor: "text-red-600"
      }
    }
  ];
  // Loop every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselCards.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselCards.length]);

  const card = carouselCards[index];
  const [formData, setFormData] = useState({
    // Step 1 - Account & Organization Info
    accountType: "",
    organization: "",
    gstin: "",

    // Step 2 - Personal Info
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

    // Step 3 - Address Info
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",

    // Step 4 - Password
    password: "",
    repeatPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle authentication logic here
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSignInWithEmail = () => {
    setShowEmailInputForOTP(true); // Show email input for OTP
  };
  const handleOTPSend = () => {
      // Add your logic here to send OTP to the email address
    console.log("Sending OTP to:", emailForOTP);
    setShowEmailInputForOTP(false);
    setShowOTPInput(true); // Show the OTP input field
  }

    const handleOTPVerify = () => {
      // Add your logic here to Verify OTP from the email address

      console.log("verifying OTP to:", emailForOTP);
        setShowOTPInput(false); // show access dashboard
    };


  const renderSignUpStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountType" className="text-gray-700 font-medium text-sm">Account type *</Label>
              <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="text-gray-700 font-medium text-sm">Organization *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="organization"
                  placeholder="Your organization name"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstin" className="text-gray-700 font-medium text-sm">Enter your GSTIN to get GST Credit</Label>
              <Input
                id="gstin"
                placeholder="GSTIN Number"
                value={formData.gstin}
                onChange={(e) => handleInputChange("gstin", e.target.value)}
                className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@domain.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1" className="text-gray-700 font-medium text-sm">Address 1 *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="address1"
                  placeholder="Street address"
                  value={formData.address1}
                  onChange={(e) => handleInputChange("address1", e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2" className="text-gray-700 font-medium text-sm">Address 2 *</Label>
              <Input
                id="address2"
                placeholder="Apartment, suite, unit, building, floor, etc."
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
                className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-700 font-medium text-sm">Country *</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger className="h-12 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-700 font-medium text-sm">State *</Label>
                <Input
                  id="state"
                  placeholder="State/Province"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700 font-medium text-sm">City *</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-gray-700 font-medium text-sm">Postal Code *</Label>
              <Input
                id="postalCode"
                placeholder="Postal/ZIP Code"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="h-12 pl-10 pr-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repeatPassword" className="text-gray-700 font-medium text-sm">Repeat Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  id="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={formData.repeatPassword}
                  onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
                  className="h-12 pl-10 pr-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showRepeatPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  flex justify-center bg-[#352281] lg:px-28 z-[-10] overflow-hidden">
      {/* Left Side - Purple Showcase with Carousel */}
      <div className="hidden lg:flex flex-1 relative  z-[10]  text-white">
        {/* Background Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-24 right-16 w-72 h-72  rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-16 w-96 h-96 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative  flex flex-col justify-center items-center text-center px-12 py-20 m-auto max-w-2xl ">
          {/* Branding */}

          <div className="bg-white absolute top-[-25px] left-[-20px] p-3 rounded-lg z-[999]">
            <img
              src="https://sixthstartech.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdwyn5jgh3%2Fimage%2Fupload%2Fv1722063037%2Flogo-1_ewjygi.webp&w=256&q=75"
              alt="Company Logo"
              width={140}
              height={32}
              className="object-contain"
            />
          </div>



          {/* Headline + Subtext */}
          <h1 className="text-4xl font-extrabold leading-tight">
            Launch Your Cloud & Email Hosting
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Secure. Scalable. Hassle-Free Hosting for Teams and Businesses.
          </p>

          {/* Preview Panel */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mt-10 shadow-lg w-full max-w-md transition-all duration-500 ease-in-out">
            <div className="bg-white text-black rounded-xl p-4 space-y-4">
              {/* Header */}
              {carouselCards.length > 0 && (
                <div key={carouselCards[index].id}>
                  <img
                    src={carouselCards[index].title}

                  />

                </div>
              )}

            </div>
          </div>

          {/* Features */}
          <div className="flex items-center justify-center space-x-6 pt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span>Auto-Scaling</span>
            </div>
          </div>
        </div>
      </div>


      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16" style={{ backgroundColor: '#352281' }}>
        <div className="w-full max-w-md" > {/* Reduced the max-w-lg to max-w-md to take up more space */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4 pt-6 px-6"> {/* Reduced padding */}
              <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isSignUp
                  ? "Join Sixthstar for professional email hosting"
                  : "Access your email hosting dashboard"
                }
              </CardDescription>
              {isSignUp && (
                <div className="flex items-center justify-center space-x-2 mt-2"> {/* Reduced margin top */}
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${step <= currentStep ? 'bg-[#352281]' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    Step {currentStep} of 4
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent className="px-6 pb-6 space-y-4"> {/* Reduced padding */}

              {/* Email or Continue */}
              {!isSignUp && !showOTPInput && !showEmailInputForOTP ? (
                <div className="flex flex-col items-center space-y-6 w-full">
                  <button
                    className="w-full max-w-sm px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-900 transition duration-300 ease-in-out font-medium tracking-wide"
                    onClick={handleSignInWithEmail}
                  >
                    Sign in with Email
                  </button>

                  {/* OR Divider */}
                  <div className="relative w-full max-w-sm flex items-center">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                  </div>
                </div>
              ) : null
              }
               {/* Email Input for OTP (Conditionally Rendered) */}
               {showEmailInputForOTP && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailForOTP" className="text-gray-700 font-medium text-sm">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                id="emailForOTP"
                type="email"
                placeholder="your@domain.com"
                value={emailForOTP}
                onChange={(e) => setEmailForOTP(e.target.value)}
                className="h-10 pl-10 border-gray-200 focus:border-[#352281] focus:ring-[#352281] rounded-lg"
              />
            </div>
          </div>

          <Button
            onClick={handleOTPSend}
            className="w-full bg-[#352281] hover:bg-[#2a1c6b] text-white font-semibold py-2.5 h-10 text-sm rounded-lg shadow-lg"
          >
            Send OTP
          </Button>
        </div>
      )}

              {/* OTP Input (Conditionally Rendered) */}
              {showOTPInput && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-gray-700 font-medium text-sm">Enter OTP *</Label>
                    <Input
                      id="otp"
                      placeholder="123456"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      className="h-10 border-gray-200 focus:border-[#352281] focus:ring-[#352281] rounded-lg"
                    />
                  </div>

                  <Button
                      onClick={handleOTPVerify}
                    className="w-full bg-[#352281] hover:bg-[#2a1c6b] text-white font-semibold py-2.5 h-10 text-sm rounded-lg shadow-lg"
                  >
                    Verify OTP
                  </Button>
                </div>
              )}

              {/* Toggle Buttons */}
              {!showOTPInput && !showEmailInputForOTP ?
              (<div className="flex bg-gray-100 rounded-lg p-0.5"> {/* Reduced padding */}
                <Button
                  type="button"
                  variant={!isSignUp ? "default" : "ghost"}
                  onClick={() => {
                    setIsSignUp(false);
                    setCurrentStep(1);
                  }}
                  className={`flex-1 ${!isSignUp ? 'bg-[#352281] text-white shadow-sm' : 'text-gray-600 bg-transparent hover:bg-gray-200'}`}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant={isSignUp ? "default" : "ghost"}
                  onClick={() => {
                    setIsSignUp(true);
                    setCurrentStep(1);
                  }}
                  className={`flex-1 ${isSignUp ? 'bg-[#352281] text-white shadow-sm' : 'text-gray-600 bg-transparent hover:bg-gray-200'}`}
                >
                  Sign Up
                </Button>
              </div>):null}

              <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduced spacing */}
                {isSignUp ? (
                  <div className="space-y-4">
                    {renderSignUpStep()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between space-x-3"> {/* Reduced spacing */}
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1 h-10 border-gray-200 hover:bg-gray-50 rounded-lg text-sm"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>
                      )}

                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-[#352281] hover:bg-[#2a1c6b] text-white font-semibold h-10 text-sm rounded-lg shadow-lg`}
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="flex-1 bg-[#352281] hover:bg-[#2a1c6b] text-white font-semibold h-10 text-sm rounded-lg shadow-lg"
                        >
                          Create Account
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (!showOTPInput && !showEmailInputForOTP ?(
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@domain.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-10 pl-10 border-gray-200 focus:border-[#352281] focus:ring-[#352281] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="h-10 pl-10 pr-12 border-gray-200 focus:border-[#352281] focus:ring-[#352281] rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked === true)}
                          className="border-gray-300" />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="text-[#352281] hover:bg-[#2a1c6b] p-0 text-sm">
                        Forgot password?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#352281]  text-white font-semibold py-2.5 h-10 text-sm rounded-lg shadow-lg"
                    >
                      Access Dashboard
                    </Button>
                  </>
                ):(<></>)
              )
              }
              </form>

              {!isSignUp && !showOTPInput && !showEmailInputForOTP &&(
                <div className="text-xs text-gray-500 text-center leading-relaxed">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-[#352281] hover:underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-[#352281] hover:underline">Privacy Policy</a>.
                </div>
              )}
              {isSignUp && currentStep === 4 && (
                <div className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                  By creating an account, you agree to our <a href="#" className="text-[#352281] hover:underline">Terms of Service</a> and <a href="#" className="text-[#352281] hover:underline">Privacy Policy</a>.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
