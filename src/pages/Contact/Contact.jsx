
import { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required."
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <h5
          color="blue-gray"
          className="mb-4 mt-20 !text-base lg:!text-2xl"
        ></h5>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Contact Us
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-14 mx-auto max-w-3xl !text-gray-500">
          Share your query and ideas with us!
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 lg:max-w-lg shadow-lg p-5 text-left"
          >
            <Typography
              variant="small"
              className="text-left text-xl !font-semibold !text-gray-600"
            >
              We would love to hear from you
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  containerProps={{
                    className: "min-w-full",
                  }}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  containerProps={{
                    className: "!min-w-full",
                  }}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                containerProps={{
                  className: "!min-w-full",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                containerProps={{
                  className: "!min-w-full",
                }}
              />
            </div>
            <Button type="submit" className="w-full bg-primary">
              Send message
            </Button>
          </form>
          <div className="flex flex-col gap-4 lg:max-w-lg shadow-lg p-5">
            <div className="text-gray-600 text-left">
              <p className="font-bold">
                Address:{" "}
                <span className="font-normal">Plot-70, Road-3, Block-C</span>
              </p>
              <p>
                Aftabnagar, Dhaka-1212 <br /> Bangladesh
              </p>
            </div>
            <div>
              <iframe
                className="w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58424.04394102527!2d90.37448986252342!3d23.765105300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d5e2055259%3A0xef380c39c46ee1ba!2sAS-Sunnah%20Foundation!5e0!3m2!1sen!2sbd!4v1734007320035!5m2!1sen!2sbd"
                height="370"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
