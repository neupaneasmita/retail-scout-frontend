import React from "react";
import mail from "../../../assets/images/dashboard/analyst/mail.svg";
import phone from "../../../assets/images/dashboard/analyst/phone.svg";
import linkedin from "../../../assets/images/dashboard/analyst/linkedin.svg";
import { Link } from "react-router-dom";
import profileUser from "../../../assets/images/dashboard/analyst/profileUser.svg";

const peoples = [
  {
    profilePhoto: `${profileUser}`,
    name: "Floyd Miles",
    linkedinLink: "www.linkedin.com",
    mailAddress: "joshiaabi19@gmai.com",
    post: "Vice President",
    from: "2012",
    to: "Now",
    location: "New York, USA",
  },
  {
    profilePhoto: `${profileUser}`,
    name: "Floyd Miles",
    linkedinLink: "www.linkedin.com",
    mailAddress: "joshiabii19@gmai.com",
    post: "Vice President",
    from: "2012",
    to: "Now",
    location: "New York, USA",
  },
  {
    profilePhoto: `${profileUser}`,
    name: "Floyd Miles",
    linkedinLink: "www.linkedin.com",
    mailAddress: "joshiabii19@gmai.com",
    post: "Vice President",
    from: "2012",
    to: "Now",
    location: "New York, USA",
  },
  {
    profilePhoto: `${profileUser}`,
    name: "Floyd Miles",
    linkedinLink: "www.linkedin.com",
    mailAddress: "joshiabii19@gmai.com",
    post: "Vice President",
    from: "2012",
    to: "Now",
    location: "New York, USA",
  },
];

const Contact = ({ filteredData }) => {
  return (
    <>
      {filteredData.emails.length > 0 ||
      filteredData.phone_numbers.length > 0 ||
      peoples.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/*Emails and Phone Numbers data available */}
          {filteredData.emails.length > 0 ||
          filteredData.phone_numbers.length > 0 ? (
            <div className="col-span-1 grid grid-cols-1 gap-6 lg:gap-8">
              {/*Emails*/}
              {filteredData.emails.length > 0 && (
                <div className="col-span-1">
                  {/*Emails*/}
                  <div className="w-full px-5 pt-5 pb-7 rounded-md shadow-xl border max-h-100">
                    <div className="heading-5 text-secondary pb-2">Emails</div>
                    {/*Mails Mapping*/}
                    <div className="overflow-y-auto max-h-80 contact-scroll">
                      {filteredData.emails.map((item, index) => {
                        return (
                          <div
                            className={` p-3 +  ${
                              index % 2 === 0 ? "" : "bg-primarygray"
                            }`}
                            key={item}
                          >
                            <div className="flex flex-row">
                              <img src={mail} alt="" className="" />
                              <div className="paragraph text-secondary pl-4">
                                {item}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/*Phone Numbers*/}
              {filteredData.phone_numbers.length > 0 && (
                <div className="col-span-1">
                  {/*Contact Number*/}
                  <div className="w-full px-5 pt-5 pb-7 rounded-md shadow-xl border max-h-100">
                    <div className="heading-5 text-secondary pb-2">
                      Phone Number
                    </div>
                    {/*Contact Numbers Mapping*/}
                    <div className="overflow-y-auto max-h-80 contact-scroll">
                      {filteredData.phone_numbers.map((item, index) => {
                        return (
                          <div
                            className={` p-3 +  ${
                              index % 2 === 0 ? "" : "bg-primarygray"
                            }`}
                            key={item}
                          >
                            <div className="flex flex-row">
                              <img src={phone} alt="" className="" />
                              <div className="paragraph text-secondary pl-4">
                                {item}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="col-span-1">
            {/*Peoples*/}
            <div className="w-full p-5 rounded-md shadow-xl border max-h-204">
              <div className="heading-5 text-secondary">People</div>
              <div className="overflow-y-auto max-h-200 contact-scroll">
                {/*Profiles Mapping*/}
                {peoples.map((people, index) => {
                  return (
                    <div
                      key={index}
                      className={` p-3 + ${
                        index % 2 === 0 ? "" : "bg-primarygray"
                      }`}
                    >
                      <div className="flex flex-row">
                        <img
                          src={people.profilePhoto}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="paragraph text-secondary pl-4">
                          <div className="flex flex-col space-y-0">
                            <div className="flex flex-row space-x-2">
                              <div className="paragraph text-secondary">
                                {people.name}
                              </div>
                              <Link
                                to={{
                                  pathname: `https://${people.linkedinLink}`,
                                }}
                                className="cursor-pointer"
                                target="_blank"
                              >
                                <img src={linkedin} alt="" className="" />
                              </Link>
                              <a href={`mailto: + ${people.mailAddress}`}>
                                <img src={mail} alt="" className="" />
                              </a>
                            </div>
                            <div className="flex flex-row space-x-2">
                              <div className="caption text-secondary">
                                {people.post}
                              </div>
                              <div className="caption text-secondary">
                                {people.from} - {people.to}
                              </div>
                            </div>
                            <div className="paragraph text-secondary">
                              {people.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center paragraph text-secondary pt-4">
          Currently contacts data are not available...
        </div>
      )}
    </>
  );
};

export default Contact;
