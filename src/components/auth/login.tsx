'use client';

import React, { useState } from 'react';



import { useRouter } from 'next/navigation';



import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Endpoints } from '@/axios/apiEndpoints';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';

export default function Login() {
  const t = useTranslations('common');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return !username || !password || !isPasswordStrong;
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setIsPasswordStrong(isStrongPassword(newPassword));
  };


  const isStrongPassword = (password: string) => {
    return true;
    // password strength validation logic
    // checking if the password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await Endpoints.login({ userName, password });

      const data = response.data;

      if (data.token) {
        localStorage.setItem('serviceToken', data.token);
        router.push("/dashboard");
      } else {
        toast.error(data.message || t('login_failed'), {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err.message || t('error_occurred'), {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="login form"
          className="w-[450px] max-w-full p-4"
          tabIndex={0}
          shadow='none'
        >
          <CardHeader className="flex justify-center">
            <div aria-label="open">
              ADR
            </div>
          </CardHeader>
          <CardBody className="grid gap-4">
            <Input
              required
              defaultValue=""
              id="email"
              label={t('email_usename_placeholder')}
              type="userName"
              isRequired
              onValueChange={setUsername}
            />

            <Input
              id="password"
              label={t('password_placeholder')}
              defaultValue=""
              isRequired
              isInvalid={!isPasswordStrong && password.length > 0}
              type={isVisible ? "text" : "password"}
              onValueChange={handlePasswordChange}
              errorMessage={t('invalid_password')}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Image
                      alt="nextui logo"
                      height={25}
                      src="/eye.png"
                      width={25}
                    />
                  ) : (
                    <Image
                      alt="nextui logo"
                      height={25}
                      src="/cross_eye.png"
                      width={25}
                    />
                  )}
                </button>
              }
            />
          </CardBody>
          <CardFooter>
            <Button className="w-full"
              color="primary"
              type="submit"
              isDisabled={isDisabled()}
            >
              {t('sign_in_label')}
            </Button>
          </CardFooter>

          <CardFooter className="flex justify-center">
            <label className="text-center text-gray-500">{t('dont_have_account')}</label>
            &nbsp;
            <Link
              className="text-center"
              color="primary"
              onClick={() => router.push("/register")}
            >
              {t('sign_up_label')}
            </Link>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
}