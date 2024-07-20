import React, { useState } from "react";

export default function useChangePasswordType() {
    const [changePasswordType, setChangePasswordType] = useState(false);

    return { changePasswordType, setChangePasswordType };
}
