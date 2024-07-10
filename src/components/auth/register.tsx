'use client';
import {useTranslations} from 'next-intl';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Endpoints } from '@/axios/apiEndpoints';
import { Input } from '@/components/ui/Input';
import { Link } from '@nextui-org/link';
import {useLocale} from 'next-intl';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react';

export default function Register() {
  const  t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return !username || !password || !firstName || !lastName || !isPasswordStrong;
  };


  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setIsPasswordStrong(isStrongPassword(newPassword));
  };
  
  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setIsUsernameValid(isValidEmail(newUsername));
  };

  const isStrongPassword = (password: string) => {
    // password strength validation logic
    // checking if the password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
  };

  const isValidEmail = (email: string) => {
    return email.length > 0
    // email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await Endpoints.signup({ username, password });
      const data = response.data;
      if (data) {
        router.push('/');
      } else {
      }
    } catch (err: any) {
      setError(err.message || t('error_occurred'));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="register form"
          className="w-[450px] max-w-full p-4"
          tabIndex={0}
          shadow='none'
        >
          <CardHeader className="flex justify-center">
            ADR
          </CardHeader>

          <CardBody className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  required
                  defaultValue=""
                  id="first_name"
                  label={t('first_name_placeholder')}
                  type="string"
                  isRequired
                  onValueChange={setFirstName}
                />
                <Input
                  required
                  defaultValue=""
                  id="last_name"
                  label={t('last_name_placeholder')}
                  type="string"
                  isRequired
                  onValueChange={setLastName}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Input
                  required
                  defaultValue=""
                  id="userName"
                  label={t('email_usename_placeholder')}
                  type="email"
                  isRequired
                  isInvalid={!isUsernameValid && username.length > 0}
                  onValueChange={handleUsernameChange}
                  errorMessage={t('invalid_email')}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input id="password" label="Password" type="password" isRequired
                defaultValue=''
                isInvalid={!isPasswordStrong && password.length > 0}
                errorMessage={t('invalid_password')}
                onValueChange={handlePasswordChange}
               />
            </div>
          </CardBody>
          <CardFooter>
          <Button className="w-full" color="primary" type="submit" isDisabled={isDisabled()}>
              {t('sign_up_label')}
            </Button>
          </CardFooter>
          <CardFooter className="flex justify-center">
            <label className="text-center text-gray-500">{t('already_have_account_placeholder')}</label>
            &nbsp;
            <Link
              className="text-center"
              color="primary"
              onClick={() => router.push("/")}
            >
              {t('sign_in_label')}
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
