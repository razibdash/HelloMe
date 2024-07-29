import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
function HomePage() {
  return (
    <Container maxW="xl" centerContent>
      <div className="mt-3 box flex bg-stone-800 rounded-lg shadow-lg">
        <div className="imgBox w-80 flex justify-center items-center">
          <img className="w-60 p-4" src="/illustration.png" alt="" />
        </div>
        <div className="loginBox w-96 bg-stone-900 rounded-r-lg">
          <div
            className="logo flex flex-col justify-center items-center
          p-4"
          >
            <img className="w-20" src="/logos.png" alt="" />
            <h1 className="text-stone-50 font-bold">Hello-Me</h1>
          </div>
          <div className="loginAnsSingUp flex flex-col justify-center items-center p-2">
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab width="100%">Login</Tab>
                <Tab width="100%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default HomePage;
