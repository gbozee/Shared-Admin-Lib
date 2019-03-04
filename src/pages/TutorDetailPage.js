/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Text, Heading, Link, Box } from "@rebass/emotion";
import { DialogButton, Tabs, TabContent } from "../shared/primitives";
import { HomePageSpinner } from "../shared/primitives/Spinner";
import { useEffect, useContext, useState } from "react";
import {
  ListGroup,
  ListItem,
  DetailItem,
  TutorDetailHeader,
  VerificationItem,
  SectionListPage,
  SubjectDetailView
} from "../shared/reusables";
import { DataContext } from "../shared/DataContext";
import { Link as RLink, Route, Switch, Redirect } from "react-router-dom";

const SubjectListItemComponent = ({ name, to = "" }) => {
  let stylings = `display: block;
        border-bottom: 1px solid black;
        padding-top: 15px;
        padding-bottom: 15px;`;
  return to ? (
    <RLink
      to={to}
      css={css`
        cursor: pointer;
        ${stylings}
      `}
    >
      {name}
    </RLink>
  ) : (
    <Text
      css={css`
        ${stylings}
      `}
    >
      {name}
    </Text>
  );
};
const SubjectDetailSection = ({
  skills,
  match,
  onRetakeTest,
  updateSubjectStatus
}) => {
  const options = [
    { value: "active", text: "Mark as active" },
    { value: "denied", text: "Deny Skill" },
    { value: "modification", text: "Get tutor to modify skill" }
  ];
  let skillInfo = skills.find(x => x.skill_name === match.params.skill);
  return (
    <SubjectDetailView
      skill={skillInfo}
      dialogText={data => {
        if (data === "active")
          return "Are you sure you want to set this subject as active?";
        if (data === "denied")
          return "Are you sure you want to deny this subject?";
        return "Are you sure you want the tutor to modify this subject?";
      }}
      options={options.filter(x => x.value !== skillInfo.status)}
      onRetakeTest={() => onRetakeTest(skillInfo, "freeze")}
      onStatusChange={action => updateSubjectStatus(skillInfo, action)}
    />
  );
};
export const TutorDetailPage = ({ match, history }) => {
  let { dispatch, actions } = useContext(DataContext);
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(false);
  let [record, setRecord] = useState(null);
  let [email_approval, setEmailApproval] = useState(false);
  let [id_verified, setIdVerified] = useState(false);
  let [profile_rejected, setProfileRejected] = useState(false);
  let [pending_verifications, setPendingVerifications] = useState([]);
  let [skills, setSkills] = useState([]);

  useEffect(() => {
    let {
      params: { email, slug }
    } = match;
    dispatch({
      type: actions.TUTOR_INFO,
      // value: { email, slug }
      value: { email, slug }
    })
      .then(data => {
        setRecord(data.record);
        setData(data.data);
        dispatch({
          type: actions.TUTOR_SKILLS,
          value: { email: data.data.email }
        }).then(skillData => {
          setSkills(skillData);
        });
      })
      .catch(error => {
        history.push("/tutor-list");
      });
    getWorkingData();
  }, []);

  const getWorkingData = () => {
    return dispatch({ type: actions.FETCH_TUTOR_WORKING_DATA, value: {} }).then(
      r => {
        setPendingVerifications(r);
      }
    );
  };
  const denyTutor = () => {
    setLoading(true);
    return localDispatch(actions.DENY_TUTOR).then(result => {
      setData(result);
      setLoading(false);
      history.push("/tutor-list");
    });
  };

  const approveTutor = () => {
    setLoading(true);
    return localDispatch(actions.APPROVE_TUTOR, {
      verified: data.verified
    }).then(r => {
      setData(r);
      setRecord(null);
      setLoading(false);
      history.push("/tutor-list");
    });
  };
  const localDispatch = (type, values) => {
    return dispatch({
      type,
      value:
        Boolean(values) && Object.values(values).length > 0
          ? { email: data.email, ...values }
          : data.email
    });
  };
  const emailButtons = () => {
    let approveManually = {
      children: "Approve Manually",
      dialogText: "Are you sure you want to manually approve the email",
      confirmAction: () => {
        this.localDispatch(actions.APPROVE_TUTOR_EMAIL).then(r => {
          setRecord(r);
          setData({ ...data, email_verified: true });
          setEmailApproval(true);
        });
      }
    };
    let result = email_approval
      ? [approveManually]
      : [
          {
            confirmAction: () => {
              localDispatch(actions.NOTIFY_TUTOR_ABOUT_EMAIL, {
                full_name: data.full_name
              }).then(record => {
                setRecord(record);
              });
            },
            dialogText:
              "Are you sure you want to notify the tutor about his email?",
            children:
              record && record.actions.includes(actions.EMAIL_VERIFICATION)
                ? "Send Notice Again"
                : "Send Notice"
          },
          approveManually
        ];
    return result;
  };
  const verificationButton = () => {
    if (
      !Boolean(data.identification) ||
      Object.keys(data.identification).length === 0
    ) {
      return [
        {
          children: "Send Email Notice",
          disabled: id_verified,
          dialogText:
            "Are you sure you want to notify the tutor to upload an ID?",
          confirmAction: () => {
            localDispatch(actions.UPLOAD_ID, {
              full_name: data.full_name
            }).then(r => {
              setIdVerified(true);
              setRecord(r);
            });
          }
        }
      ];
    }
    let reject = {
      children: "Reject",
      dialogText: "You are about to reject the ID of the tutor. Confirm?",
      confirmAction: () => {
        localDispatch(actions.REJECT_ID, {
          full_name: data.full_name
        }).then(rr => {
          setRecord(rr);
          setData({ ...data, identification: {} });
        });
      }
    };
    let result = id_verified
      ? []
      : [
          {
            confirmAction: () => {
              localDispatch(actions.APPROVE_ID, {}).then(r => {
                setRecord(r);
                setIdVerified(true);
                setData({
                  ...data,
                  identification: { ...data.identification, verified: true }
                });
              });
            },
            dialogText: "Are you sure you want to approve the ID?",
            children:
              record && record.actions.includes(actions.ID_VERIFICATION)
                ? "Approve Again"
                : "Approve ID"
          },
          reject
        ];
    return result;
  };
  const profilePicButton = () => {
    let result = [];
    if (!Boolean(data.profile_pic)) {
      result.push({
        children: "Send Notice",
        disabled: profile_rejected,
        dialogText:
          "Are you sure you want to notify the tutor to upload a profile Pic?",
        confirmAction: () => {
          localDispatch(actions.UPLOAD_PROFILE_PIC, {
            full_name: data.full_name
          }).then(r => {
            setRecord(r);
            setProfileRejected(true);
          });
        }
      });
    } else {
      if (record && record.actions.includes(actions.PROFILE_VERIFICATION)) {
        result.push({
          children: "Approve",
          disabled: profile_rejected,
          confirmAction: () => {
            localDispatch(actions.APPROVE_PROFILE_PIC).then(r => {
              setRecord(r);
              setProfileRejected(true);
            });
          },
          dialogText:
            "Are you sure you want to approve the profilePic for the tutor?"
        });
      }
      result.push({
        children: "Reject",
        disabled: profile_rejected,
        confirmAction: () => {
          localDispatch(actions.REJECT_PROFILE_PIC, {
            full_name: data.full_name
          }).then(() => {
            setProfileRejected(true);
          });
        },
        dialogText:
          "Are you sure you want to delete the profilePic for the tutor?"
      });
    }
    return result;
  };
  function idVerified(dd = {}, force = false) {
    let newData = dd;
    if (!Boolean(dd)) {
      newData = {};
    }
    return force
      ? Boolean(newData.verified)
      : Object.keys(newData).length > 0
      ? newData.verified
      : true;
  }
  const fromWorkingDirectory = () => {
    let {
      params: { email }
    } = match;
    return Boolean(email);
  };
  const updateCurriculum = () => {};
  function skillIsFrozen() {
    return pending_verifications
      .filter(x => x.actions.includes("froze_profile"))
      .map(x => x.email)
      .includes(data.email);
  }
  const updateSubjectStatus = (skill, action) => {
    dispatch({
      type: actions.SKILL_ADMIN_ACTION,
      value: {
        skill,
        email: data.email,
        action,
        full_name: data.full_name
      }
    }).then(dd => {
      if (skill) {
        setSkills(skills.map(x => (x.skill.name === dd.skill.name ? dd : x)));
      }
      getWorkingData();
    });
  };
  return Object.keys(data).length === 0 ? (
    <HomePageSpinner />
  ) : (
    <Flex flexDirection="column">
      <TutorDetailHeader
        image={data.profile_pic}
        detail={[
          data.years_of_experience,
          data.full_name,
          data.email,
          data.phone_no
        ]}
        frozen={skillIsFrozen()}
        unFreezeProfile={() => updateSubjectStatus(null, "unfreeze")}
      >
        {idVerified(data.identification, true) && <Text>Id Verified</Text>}
        {data.email_verified && <Text>Email Verified</Text>}
        <Text>Social Veifications</Text>
      </TutorDetailHeader>
      <Tabs>
        <TabContent heading="Tutor Information">
          <Flex mb={4} flexDirection="column">
            <ListGroup name="Verifications" />
            {data.email_verified ? null : (
              <VerificationItem
                buttons={emailButtons()}
                label="Email Verification"
              />
            )}
            {idVerified(data.identification, true) ? null : (
              <VerificationItem
                label="ID Verifications"
                buttons={verificationButton()}
              >
                {data.identification ? (
                  <Link
                    css={css`
                      cursor: pointer;
                    `}
                    target="_blank"
                    href={data.identification.link}
                  >
                    {data.identification.link}
                  </Link>
                ) : null}
              </VerificationItem>
            )}
            <VerificationItem
              label="Profile Picture Approval"
              buttons={profilePicButton()}
            >
              <Link
                css={css`
                  cursor: pointer;
                `}
                target="_blank"
                href={data.profile_pic}
              >
                {data.profile_pic}
              </Link>
            </VerificationItem>

            <ListGroup name="Tutor Description" />
            <Text p={3}>{data.tutor_description}</Text>
            <ListGroup name="Educations" />
            {data.educations.map(education => (
              <ListItem
                key={education.school}
                heading={education.school}
                subHeading={education.course}
                rightSection={education.degree}
              />
            ))}
            <ListGroup name="Work Experience" />
            {data.work_experiences.map(w_experience => (
              <ListItem
                key={w_experience.name}
                heading={w_experience.name}
                subHeading={w_experience.role}
              />
            ))}
            <ListGroup name="Location" />
            {data.locations.map(location => (
              <ListItem
                key={location.state}
                heading={`${location.address} ${location.vicinity}, ${
                  location.state
                }`}
              />
            ))}
            <ListGroup name="Subject Veluation Dump" />
            <Flex>
              <Flex
                css={css`
                  flex: 1;
                `}
                flexDirection="column"
              >
                <Heading>Potential Subjects</Heading>
                {data.potential_subjects.map(subject => (
                  <DetailItem key={subject} label={subject} />
                ))}
                <Heading>Levels With Exam</Heading>
                {JSON.stringify(data.levels_with_exam)}
                <Heading>Answers</Heading>
                {JSON.stringify(data.answers)}
              </Flex>
              <Flex
                css={css`
                  flex: 1;
                `}
                flexDirection="column"
              >
                <Heading>Classes</Heading>
                {data.classes.map(klass => (
                  <DetailItem key={klass} label={klass} />
                ))}
                <Heading>Curriculum Used</Heading>
                {data.curriculum_used.map(klass => (
                  <DetailItem key={klass} label={klass} />
                ))}
              </Flex>
            </Flex>
            {data.curriculum_explanation ? (
              <Box
                my={3}
                pb={3}
                css={css`
                  border-bottom: 1px solid #e8e8e8;
                `}
              >
                <ListGroup name="Curriculum Explanation" />
                <Box>
                  <Text p={3}>{data.curriculum_explanation}</Text>
                </Box>
              </Box>
            ) : (
              <Box
                my={3}
                pb={3}
                css={css`
                  border-bottom: 1px solid #e8e8e8;
                `}
              >
                <DialogButton
                  dialogText="Are you sure you want to notify this tutor"
                  confirmAction={updateCurriculum}
                >
                  Notify tutor to update curriculum
                </DialogButton>
              </Box>
            )}
            <Flex justifyContent="space-between" pt={3}>
              {!data.verified && (
                <DialogButton
                  dialogText="Are you sure you want to approve this tutor"
                  confirmAction={approveTutor}
                  disabled={loading || record}
                >
                  {`Approve Tutor`}
                </DialogButton>
              )}
              <DialogButton
                dialogText="Are you sure you want to deny this tutor?"
                confirmAction={denyTutor}
                disabled={loading}
              >
                Deny Tutor
              </DialogButton>
              {data.verified && (
                <DialogButton
                  dialogText="Are you sure you want to freeze this tutor profile"
                  confirmAction={() => {
                    updateSubjectStatus(null, "freeze");
                    setData({ ...data, verified: false });
                  }}
                  disabled={loading}
                >
                  Freeze Profile
                </DialogButton>
              )}
            </Flex>
          </Flex>
        </TabContent>
        <TabContent heading="Subjects">
          {" "}
          <Flex flexDirection="column">
            {skills.length === 0 ? (
              <HomePageSpinner />
            ) : (
              <Flex>
                <Flex
                  flexDirection="column"
                  css={css`
                    flex: 1;
                    overflow-y: scroll;
                  `}
                >
                  <SectionListPage
                    data={skills}
                    callback={skill => ({
                      name: skill.skill_name,
                      to:
                        skill.status !== "denied" &&
                        `${match.url}/subjects/${skill.skill_name}`
                    })}
                    funcGetter={item => item.status}
                    Component={SubjectListItemComponent}
                    orderFunc={(a, b) => {
                      if (a.status < b.status) return -1;
                      if (a.status > b.status) return 1;
                      return 0;
                    }}
                    keyFunc={ss => `${ss.skill_name}-${ss.status}`}
                  />
                </Flex>
                <Flex
                  px={3}
                  py={3}
                  flexDirection="column"
                  css={css`
                    flex: 4;
                  `}
                >
                  <Switch>
                    <Route
                      path="/tutor-list/:slug/subjects/:skill"
                      render={pathProps => {
                        return (
                          <SubjectDetailSection
                            {...pathProps}
                            updateSubjectStatus={updateSubjectStatus}
                            skills={skills}
                            onRetakeTest={updateSubjectStatus}
                          />
                        );
                      }}
                    />
                    <Route
                      path="/worked-records/:email/subjects/:skill"
                      render={pathProps => {
                        return (
                          <SubjectDetailSection
                            {...pathProps}
                            updateSubjectStatus={updateSubjectStatus}
                            skills={skills}
                            onRetakeTest={updateSubjectStatus}
                          />
                        );
                      }}
                    />
                    {skills[0] && skills[0].status !== "denied" && (
                      <Redirect
                        to={`${match.url}/subjects/${skills[0].skill_name}`}
                      />
                    )}
                  </Switch>
                </Flex>
              </Flex>
            )}
          </Flex>
        </TabContent>
      </Tabs>
    </Flex>
  );
};

export default TutorDetailPage;
