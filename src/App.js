import {CreateNote, NavBar, NoteUICollection, UpdateNote} from "./ui-components";
import {useState} from "react";

//mport {withAuthenticator} from "@aws-amplify/ui-react";
import {Authenticator, useTheme, View, Image, Heading, Button, useAuthenticator} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import {Text} from "@aws-amplify/ui-react";

const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="Amplify logo"
                    src="https://docs.amplify.aws/assets/logo-dark.svg"
                />
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; All Rights Reserved
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Sign in to your account
                </Heading>
            );
        },
        Footer() {
            const { toResetPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toResetPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupTOTP: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
};

const formFields = {
    signIn: {
        username: {
            labelHidden: false,
            placeholder: 'Enter your email',
        },
    },
    signUp: {
        password: {
            labelHidden: false,
            label: 'Password:',
            placeholder: 'Enter your Password:',
            isRequired: false,
            order: 2,
        },
        confirm_password: {
            labelHidden: false,
            label: 'Confirm Password:',
            order: 1,
        },
    },
    forceNewPassword: {
        password: {
            labelHidden: false,
            placeholder: 'Enter your Password:',
        },
    },
    resetPassword: {
        username: {
            labelHidden: false,
            placeholder: 'Enter your email:',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            labelHidden: false,
            placeholder: 'Enter your Confirmation Code:',
            label: 'New Label',
            isRequired: false,
        },
        confirm_password: {
            labelHidden: false,
            placeholder: 'Enter your Password Please:',
        },
    },
    setupTOTP: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            labelHidden: false,
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            labelHidden: false,
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};


export default function App() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateNote, setUpdateNote] = useState();
    return(
        <Authenticator variation="modal" formFields={formFields} components={components}>
            {({signOut}) => (
                <>
                <NavBar
                    marginBottom='20px' width='100%'
                    overrides={{
                        Button31632483: { onClick: () => setShowCreateModal(true) },
                        Button31632487: {
                            onClick: async () => {
                                // Clear the Datastore when a user signs out.
                                // If two users are accessing the notes app from the same computer they will be default see
                                // each other's data
                                //await DataStore.clear()
                                signOut()
                            }
                        }
                    }}
                />
                <div className='container'>
                    <NoteUICollection overrideItems={({ item, idx }) => {
                        return {
                            overrides: {
                                Vector31472745: {
                                    onClick: () => {
                                        setShowUpdateModal(true)
                                        setUpdateNote(item)
                                    }
                                }
                            }
                        }
                    }}
                    />
                </div>
                <div className='modal' style={{ display: showCreateModal === false && 'none' }}>
                    <CreateNote overrides={{
                        MyIcon: {
                        as: 'button',
                        onClick: () => setShowCreateModal(false)
                        }
                    }}
                    />
                </div>
                <div className='modal' style={{ display: showUpdateModal === false && 'none' }}>
                    <UpdateNote
                        note={updateNote} overrides={{
                            MyIcon: {
                                as: 'button',
                                onClick: () => setShowUpdateModal(false)
                            }
                        }}
                    />
                </div>
                </>
            )}
        </Authenticator>
    )

}

// function App( { signOut }) {
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
//     const [updateNote, setUpdateNote] = useState();
//
//   return (
//     <>
//         <Authenticator>
//             <NavBar
//                 marginBottom='20px' width='100%'
//                 overrides={{
//                     Button31632483: { onClick: () => setShowCreateModal(true) },
//                     Button31632487: {
//                         onClick: async () => {
//                             //Clear the Datastore when a user signs out.
//                             // If two users are accessing the notes app from the same computer they will be default see
//                             // each other's data
//                             await DataStore.clear()
//                             signOut()
//                         }
//                     }
//                 }}
//             />
//             <div className='container'>
//                 <NoteUICollection overrideItems={({ item, idx }) => {
//                     return {
//                         overrides: {
//                             Vector31472745: {
//                                 onClick: () => {
//                                     setShowUpdateModal(true)
//                                     setUpdateNote(item)
//                                 }
//                             }
//                         }
//                     }
//                 }}
//                 />
//             </div>
//             <div className='modal' style={{ display: showCreateModal === false && 'none' }}>
//                 <CreateNote overrides={{
//                     MyIcon: {
//                         as: 'button',
//                         onClick: () => setShowCreateModal(false)
//                     }
//                 }}
//                 />
//             </div>
//             <div className='modal' style={{ display: showUpdateModal === false && 'none' }}>
//                 <UpdateNote
//                     note={updateNote} overrides={{
//                     MyIcon: {
//                         as: 'button',
//                         onClick: () => setShowUpdateModal(false)
//                     }
//                 }}
//                 />
//             </div>
//         </Authenticator>
//     </>
//   );
// }
//
// export default App;
