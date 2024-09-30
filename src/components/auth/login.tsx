'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';

import 'react-toastify/dist/ReactToastify.css';

import { useTranslations } from 'next-intl';
import { Button, Input } from 'ui-library';


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

    
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="login form"
          className="w-[500px] max-w-full p-4"
          tabIndex={0}
          shadow='none'
        >
          <CardHeader className="flex justify-center">
            <div aria-label="open">
              <Image
                alt="opencdx logo s"
                aria-label="Hello World Logo"
                height={40}
                radius="none"
                tabIndex={0}
                width={100}
              />
            </div>
          </CardHeader>
          <CardBody className="grid gap-4">
            <Input
              required
              defaultValue=""
              variant="bordered"
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
              variant="bordered"
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
              {t('login_label')}
            </Button>
          </CardFooter>

          <CardFooter className="flex justify-center">
            <label className="text-center text-gray-500">{t('dont_have_account')}</label>
            &nbsp;
            <Link
              className="text-center"
              color="primary"
              onClick={() => router.push("/register")}
              onPress={() => router.push("/register")}
            >
              {t('sign_up_label')}
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}