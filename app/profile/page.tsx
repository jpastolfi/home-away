import SubmitButton from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import { updateProfileAction, fetchProfile } from '@/utils/actions'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


export default async function ProfilePage() {
  const profile = await fetchProfile();
  return <section>
    <h1 className='text-2xl font-semibold mb-8 capitalize'>user profile</h1>
    <div className='border p-8 rounded-md'>
      {/* Image input container */}
      <FormContainer action={updateProfileAction}>
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
          <FormInput type='text' name='firstName' label='First Name' defaultValue={profile.firstName} />
          <FormInput type='text' name='lastName' label='Last Name' defaultValue={profile.lastName} />
          <FormInput type='text' name='username' label='Username' defaultValue={profile.username} />
        </div>
        <SubmitButton text='Update Profile' className='mt-8' />
      </FormContainer>
    </div>
  </section>
}