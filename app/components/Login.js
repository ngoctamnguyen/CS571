import { View } from 'react-native';
import { useState } from 'react';

import Signup from './Signup';
import Signin from './Signin';

const Login = () => {
    const [signing, setSigning] = useState(true);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {signing ? <Signin setSigning={setSigning}/> : <Signup setSigning={setSigning}/>}
        </View>
    );
};

export default Login;