import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import LabeledInput from '../components/LabeledInput';
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';


const validateFields = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    }

    return isValid
}

const createAccount = (email, password) => {
   createUserWithEmailAndPassword(getAuth(),email,password)
    .then(({user}) => {
        console.log("creating user");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
         console.log(errorCode,errorMessage);
      });

};
const login = ( email,password) => {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      
    })
    .catch((error) => {
        alert(error.message)
      console.log(error.message);
    });
};
export default () => {
    const { colors } = useTheme();

    const [isCreateMode, setIsCreateMode] = useState(false);
    const [emailField, setEmailField] = useState({
        text: "",
        errorMessage: ""
    });
    const [passwordField, setPasswordField] = useState({
        text: "",
        errorMessage: ""
    });
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "",
        errorMessage: ""
    });
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[styles.container,{color:colors.background}]} 
            enableAutomaticScroll = {true}
            >
            <Text style={[styles.header,{color:colors.text}]}>Todo App</Text>
            <View style={{ flex: 1 }}>
                <LabeledInput
                    label="Email"
                    text={emailField.text}
                    onChangeText={(text) => {
                        setEmailField({ text });
                    }}
                    inputStyle = {{color:colors.text}}
                    errorMessage={emailField.errorMessage}
                    labelStyle={[styles.label,{color:colors.text}]}
                    autoCompleteType="email"
                />
                <LabeledInput
                    label="Password"
                    secureTextEntry={true}
                    text={passwordField.text}
                    onChangeText={(text) => {
                        setPasswordField({ text });
                    }}
                    inputStyle = {{color:colors.text}}
                    errorMessage={passwordField.errorMessage}
                    labelStyle={[styles.label,{color:colors.text}]}
                    autoCompleteType="password"
                />
                {isCreateMode && (
                    <LabeledInput
                        label="Password(Again)"
                        secureTextEntry={true}
                        text={passwordReentryField.text}
                        onChangeText={(text) => {
                            setPasswordReentryField({ text });
                        }}
                        inputStyle = {{color:colors.text}}
                        errorMessage={passwordReentryField.errorMessage}
                        labelStyle={[styles.label,{color:colors.text}]}

                    />
                )}

                <TouchableOpacity
                    onPress={() => { setIsCreateMode(!isCreateMode) }}
                >
                    <Text style={{ alignSelf: "center", color: Colors.blue, fontSize: 16, margin: 4 }}>
                        {isCreateMode ? "Already have an account?" : "Create new account"}
                    </Text>
                </TouchableOpacity>
            </View>
            <Button
                text={isCreateMode ? "Create Account" : "Login"}
                onPress={() => {
                    const isValid = validateFields(emailField.text, passwordField.text);
                    let isAllValid = true;
                    if (!isValid.email) {
                        emailField.errorMessage = "Please enter a valid email";
                        setEmailField({ ...emailField });
                        isAllValid = false;
                    }
                    if (!isValid.password) {
                        passwordField.errorMessage = "Password must be at least 8 long with numbers,uppercase,lowercase and symbols";
                        setPasswordField({ ...passwordField });
                        isAllValid = false;
                    }
                    if (isCreateMode && passwordReentryField.text != passwordField.text) {
                        passwordReentryField.errorMessage = "Passwords do not match!";
                        passwordReentryField({ ...passwordReentryField })
                        isAllValid = false;
                    }
                    if (isAllValid) {
                        isCreateMode ? createAccount(emailField.text, passwordField.text) : login(emailField.text, passwordField.text);
                    }
                }}
                buttonStyle={{ backgroundColor: Colors.blue, marginBottom:32 }}
            />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "stretch"
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    header: {
        fontSize: 32,
        alignSelf: "center",
        paddingTop:32,
        paddingBottom:32,
    }
});