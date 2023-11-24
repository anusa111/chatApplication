const Footer = () => {
  const footerMenu = [
    {
      title: "Pages",
      menu: [
        {
          menu: "Home",
          link: "/",
        },
        {
          menu: "Features",
          link: "/features",
        },

        {
          menu: "Contact Us",
          link: "contact-us",
        },
      ],
    },
    {
      title: "Resources",
      menu: [
        {
          menu: "Features",
          link: "/features",
        },
        {
          menu: "Privacy Policy",
          link: "/privacy-policy",
        },
      ],
    },
    {
      title: "Follow Us",
      menu: [
        {
          menu: "LinkedIn",
          link: "https://www.linkedin.com/company/chibihr/about/",
        },
        {
          menu: "Instagram",
          link: "https://www.instagram.com/",
        },
        {
          menu: "Facebook",
          link: "https://www.facebook.com/chibihrofficial",
        },
      ],
    },
  ];

  const footer = [
    {
      menu: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      menu: "Terms of Service",
      link: "/terms-of-service",
    },
  ];

  return (
    <div className="bg-[#f4f4f4]">
      <div className="layout layout-padding component-padding">
        <div className="flex flex-col gap-[40px]">
          <div className="grid lg:grid-cols-9 grid-col-1 lg:gap-[140px] gap-[40px]">
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-[32px]">
                <a
                  href="/"
                  className=" lg:col-span-3 flex items-center text-2xl font-bold "
                  style={{
                    color: "var(--primary-color)",
                  }}
                >
                  Chat Chamber
                </a>
                <div className="text-[16px] text-[#596780]">
                  Your One-Stop Solution for Effortless HR and Workforce
                  Management, Providing an Exceptional Digital Experience on Web
                  and Mobile.
                </div>
              </div>
            </div>
            <div className=" lg:col-span-6 grid lg:grid-cols-3 grid-cols-2 gap-[20px]">
              {footerMenu.map((data, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-col gap-[32px]">
                      <div className="text-[20px] font-bold">{data.title}</div>
                      <div className="flex flex-col gap-[24px]">
                        {data.menu.map((data, index) => {
                          return (
                            <div key={index}>
                              <a href={data.link} className="text-[16px]">
                                {data.menu}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t-[1px] border-[#b2b2f0] pt-[20px] text-[16px]">
            <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-[20px]">
              <div className="flex lg:flex-row flex-col lg:gap-[32px] gap-[16px]">
                {footer.map((data, index) => {
                  return (
                    <div key={index} className="">
                      <a href={data.link}>{data.menu}</a>
                    </div>
                  );
                })}
              </div>
              <div className="">© Chat Chamber, 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
