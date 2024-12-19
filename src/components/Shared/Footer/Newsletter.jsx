// import { Typography } from "@material-tailwind/react";
import { Button, Input } from "@material-tailwind/react";

export function NewsLetter() {
  return (
    <section className="py-2 mx-auto container max-w-4xl px-8">
      <div className="flex items-center flex-col gap-2">
        {/* <Typography className="!font-semibold text-white">
          Stay in the Know: Subscribe for Exclusive Updates
        </Typography> */}
        <div className="flex items-start flex-col gap-4 md:flex-row">
          <Input className="text-gray-900" label="Enter your email" />
          <Button className="flex-shrink-0 md:w-fit w-full ">subscribe</Button>
        </div>
      </div>
    </section>
  );
}
export default NewsLetter;
