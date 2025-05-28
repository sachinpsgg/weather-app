import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/Card.jsx';

import {supabase} from "../lib/supabaseClient.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {Label} from "recharts";
import {Input} from "../components/ui/Input.jsx";
import {Checkbox} from "@radix-ui/react-checkbox";
import {Button} from "../components/ui/Button.jsx";


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Creating account...");
        try {
            const {  error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { full_name: formData.name }, // optional: custom user metadata
                },
            });

            if (error) {
                toast.error(`Sign-up failed: ${error.message}`, { id: loadingToastId });
            } else {
                toast.success("Account created successfully! Login Now", { id: loadingToastId });
                navigate("/login");
            }
        } catch (err) {
            toast.error("Something went wrong during sign-up.", { id: loadingToastId });
        }
    };
    const passwordRequirements = [
        { text: 'At least 8 characters', met: formData.password.length >= 8 },
        { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
        { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
        { text: 'Contains number', met: /\d/.test(formData.password) },
    ];

    const isFormValid =
        formData.name &&
        formData.email &&
        formData.password &&
        formData.password === formData.confirmPassword &&
        passwordRequirements.every((req) => req.met);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative z-10">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
                    <CardDescription className="text-blue-100">
                        Join us to get personalized weather insights
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* Password Validation */}
                            {formData.password && (
                                <div className="space-y-1 mt-2">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs">
                                            <Check
                                                className={`h-3 w-3 ${req.met ? 'text-green-400' : 'text-gray-400'}`}
                                            />
                                            <span className={req.met ? 'text-green-300' : 'text-blue-200'}>
                        {req.text}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {formData.confirmPassword && (
                                <div className="flex items-center gap-2 text-xs mt-1">
                                    <Check
                                        className={`h-3 w-3 ${
                                            formData.password === formData.confirmPassword
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                        }`}
                                    />
                                    <span
                                        className={
                                            formData.password === formData.confirmPassword
                                                ? 'text-green-300'
                                                : 'text-red-300'
                                        }
                                    >
                    {formData.password === formData.confirmPassword
                        ? 'Passwords match'
                        : 'Passwords do not match'}
                  </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, agreeToTerms: !!checked })
                                }
                                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-1"
                            />
                            {/*<Label*/}
                            {/*    htmlFor="agreeToTerms"*/}
                            {/*    className="text-sm text-blue-200 leading-relaxed"*/}
                            {/*>*/}
                            {/*    I agree to the{' '}*/}
                            {/*    <button className="text-blue-300 hover:text-white underline">*/}
                            {/*        Terms of Service*/}
                            {/*    </button>{' '}*/}
                            {/*    and{' '}*/}
                            {/*    <button className="text-blue-300 hover:text-white underline">*/}
                            {/*        Privacy Policy*/}
                            {/*    </button>*/}
                            {/*</Label>*/}
                        </div>
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 transition-all duration-200 group"
                        >
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                </CardContent>

                <CardFooter className="text-center">
                    <p className="text-sm text-blue-200">
                        Already have an account?{' '}
                        <button className="text-blue-300 hover:text-white font-semibold transition-colors" onClick={()=> navigate('/login')}>
                            Sign in
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
