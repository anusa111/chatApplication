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
          link: "/",
        },

        {
          menu: "Contact Us",
          link: "/",
        },
      ],
    },
    {
      title: "Resources",
      menu: [
        {
          menu: "Features",
          link: "#",
        },
      ],
    },
    {
      title: "Follow Us",
      menu: [
        {
          menu: "LinkedIn",
          link: "https://www.linkedin.com/",
        },
        {
          menu: "Instagram",
          link: "https://www.instagram.com/",
        },
        {
          menu: "Facebook",
          link: "https://www.facebook.com/",
        },
      ],
    },
  ];

  // const footer = [
  //   {
  //     menu: "Privacy Policy",
  //     link: "/privacy-policy",
  //   },
  //   {
  //     menu: "Terms of Service",
  //     link: "/terms-of-service",
  //   },
  // ];

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
                  Join ChatChamber for a vibrant chat experience! Whether making
                  friends, discussing passions, or sharing laughs, it's where
                  conversations come alive!
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
            <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-[20px]">
              {/* <div className="flex lg:flex-row flex-col lg:gap-[32px] gap-[16px]">
                {footer.map((data, index) => {
                  return (
                    <div key={index} className="">
                      <a href={data.link}>{data.menu}</a>
                    </div>
                  );
                })}
              </div> */}
              <div className="">© Chat Chamber, 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
