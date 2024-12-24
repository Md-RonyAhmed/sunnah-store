import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   
  export function SubCategories({subCategories}) {
   
    return (
        <TabsHeader>
          {subCategories.map((sc) => (
            <Tab key={sc} value={sc}>
              {sc}
            </Tab>
          ))}
        </TabsHeader>
    //   <Tabs value="html">
    //     <TabsHeader>
    //       {subCategories.map((sc) => (
    //         <Tab key={sc} value={sc}>
    //           {sc}
    //         </Tab>
    //       ))}
    //     </TabsHeader>
    //     <TabsBody>
    //       {subCategories.map((sc) => (
    //         <TabPanel key={sc} value={sc}>
    //           {sc}
    //           <h1>
    //             Hello
    //           </h1>
    //         </TabPanel>
    //       ))}
    //     </TabsBody>
    //   </Tabs>
    );
  }