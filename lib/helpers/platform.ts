import {execSync} from "child_process";

export const supportedPlatformNames: { [index: string]: string; } = {
    get None() { return "none"; },
    get Windows() { return "win32"; },
    get OSX() { return "darwin"; },
    get Ubuntu() { return "ubuntu"; },
    get CentOS() { return "centos"; },
    get RHEL() { return "rhel"; },
    get Debian() { return "debian"; }
};

export enum SupportedPlatform {
    None,
    Windows,
    OSX,
    CentOS,
    Debian,
    RHEL,
    Ubuntu
}

function getSupportedPlatform() {
    if (process.platform === "win32") {
        return SupportedPlatform.Windows;
    } else if (process.platform === "darwin") {
        return SupportedPlatform.OSX;
    } else if (process.platform === "linux") {
        // Get the text of /etc/*-release to discover which Linux distribution we"re running on.
        let release = execSync("cat /etc/*-release").toString().toLowerCase();

        if (release.indexOf("ubuntu") >= 0) {
            return SupportedPlatform.Ubuntu;
        } else if (release.indexOf("centos") >= 0) {
            return SupportedPlatform.CentOS;
        } else if (release.indexOf("rhel") >= 0) {
            return SupportedPlatform.RHEL;
        } else if (release.indexOf("debian") >= 0) {
            return SupportedPlatform.Debian;
        }
    }

    return SupportedPlatform.None;
}


export const supportedPlatform = getSupportedPlatform();
