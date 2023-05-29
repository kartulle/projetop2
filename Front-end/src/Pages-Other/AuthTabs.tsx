import * as Tabs from '@radix-ui/react-tabs';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

export function AuthTabs() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <Tabs.Root defaultValue="SignIn" className="lg:w-1/4 bg-white shadow-md">
        <Tabs.List className="flex justify-around bg-white shadow-md">
          <Tabs.Trigger className="text-indigo-600 font-medium py-2 px-4 hover:bg-indigo-200" value="SignIn">Sign In</Tabs.Trigger>
          <Tabs.Trigger className="text-indigo-600 font-medium py-2 px-4 hover:bg-indigo-200" value="SignUp">Sign Up</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="SignIn">
          <SignIn />
        </Tabs.Content>
        <Tabs.Content value="SignUp">
          <SignUp />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
