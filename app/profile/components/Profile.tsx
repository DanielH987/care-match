"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';

import Input from "../../components/inputs/Input";
import Modal from '../../components/Modal';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import OtherButton from '../../components/OtherButton';
import SettingsModal from '@/app/components/sidebar/SettingsModal';
import { format } from 'date-fns';
import { HiMiniPencil } from "react-icons/hi2";
import Header from "@/app/components/Header";

interface ProfileProps {
  currentUser: User;
}

const Profile: React.FC<ProfileProps> = ({
  currentUser = {}
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(currentUser, '&TEST_CURRENT_USER')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || '',
      image: currentUser?.image || '/images/placeholder.jpg',
      email: currentUser?.email || ''
    }
  });

  const handleCancel = () => {
    router.back();
  };

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { 
      shouldValidate: true 
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      toast.success('Profile updated successfully!')
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-auto
        lg:right-0   
        lg:block
        overflow-y-auto 
        border-r 
        bg-[#FFF1EC]
        block w-full left-0
      "
    >
      <div className="px-5">
        <Header headerText="Profile" />
        <form 
          className="
            max-w-xl   
            w-full     
            mx-auto     
          "
          onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex justify-center">
                    <div className="mt-2 relative flex items-center gap-x-3">
                      <Image
                        width="90"
                        height="90" 
                        className="rounded-full" 
                        src={image || currentUser?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                      />
                      <div className="absolute bottom-0 right-0 mt-0 mr-0">
                        {isClient && (
                          <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="ahcfhj3z"
                          >
                            <button
                              disabled={isLoading}
                              type="button"
                              className="p-1 bg-white rounded-full shadow-sm text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <HiMiniPencil />
                            </button>
                          </CldUploadButton>
                          )}
                      </div>
                    </div>
                  </div>
                <h2 
                  className="
                    text-base 
                    font-semibold 
                    leading-7 
                    text-gray-900
                  "
                >
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Edit your public information.
                </p>

                <div className="mt-10 flex flex-col gap-y-8">
                  <Input
                    disabled={isLoading}
                    label="Name" 
                    id="name" 
                    errors={errors} 
                    required 
                    register={register}
                  />
                </div>

                <div className="mt-10 flex flex-col gap-y-8">
                  <Input
                    disabled={isLoading}
                    label="Email" 
                    id="email" 
                    errors={errors} 
                    required 
                    register={register}
                  />

                  <div>
                    <p className="text-sm text-gray-600">
                      {currentUser?.createdAt ? 
                        `Joined Care Match on: ${format(new Date(currentUser.createdAt), 'PPP')}` :
                        'Join date not available'
                      }
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div 
              className="
                mt-6 
                flex 
                items-center 
                justify-end 
                gap-x-6
              "
            >
              <OtherButton 
                disabled={isLoading}
                secondary 
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </OtherButton>
              <OtherButton 
                disabled={isLoading}
                type="submit"
              >
                Save
              </OtherButton>
            </div>
          </form>
      </div>
    </aside>

  </div>
  );
}
 
export default Profile;