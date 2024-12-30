import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Button, Spinner, TextInput, Label } from 'flowbite-react';
import ReCAPTCHA from 'react-google-recaptcha-enterprise';
import Cookies from 'js-cookie';
import { useWixClient } from '@app/hooks/useWixClient';
import { WIX_REFRESH_TOKEN } from '@app/constants';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, closePopup }) => {
  if (!isOpen) return null;

  const wixClient = useWixClient();
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const handlePhoneChange = (value: string) => {
    setPhone(value); // Update phone number
  };

  const resetState = () => {
    setLoading(false);
    setEmail('');
    // setUsername('');
    setPhone('');
    setPassword('');
    setCaptcha(null);
    setError('');
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    let response;

    try {
      // Handle the registration request
      response = await wixClient.auth.register({
        email,
        password,
        captchaTokens: { recaptchaToken: captcha! },
        profile: { nickname: email, phones: [phone] },
      });

      if (response.loginState === 'SUCCESS') {
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken!);
        Cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), { expires: 2 });
        wixClient.auth.setTokens(tokens);
        closePopup();
      } else if (response.loginState === 'FAILURE') {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    } finally {
      captchaRef.current?.reset();
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-lg shadow-xl max-w-xs md:max-w-2xl text-center flex">
        <div className='bg-gray-700 w-96 hidden md:block'>
          tacogfugfuyguyguyggyig
        </div>
        <div className='p-6 pb-2'>
          <h2 className="text-xl font-bold mb-4">Join the village!</h2>
          <p className="mb-4">Get the latest updates and offers.</p>

          {/* Error message display */}
          {error && (
            <div className="text-red-500 mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={submit}>
            {/* Username Field */}
            {/* <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /> */}
            
            {/* Email Field */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Phone Field */}
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              required
            />
            
            {/* Password Field */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {/* ReCAPTCHA */}
            <ReCAPTCHA
              size="normal"
              ref={captchaRef}
              sitekey={wixClient.auth.captchaVisibleSiteKey}
              onChange={setCaptcha}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-lime-500 text-white rounded-md hover:bg-lime-600"
              disabled={loading || !email || !password || !phone || !captcha}
            >
              {loading ? <Spinner aria-label="Loading" /> : 'Subscribe'}
            </button>
          </form>

          {/* Close button */}
          <button
            onClick={closePopup}
            className="mt-4 text-black font-black hover:text-red-700 text-3xl transition-all duration-500"
          >
            <IoMdCloseCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
