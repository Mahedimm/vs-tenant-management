export class Constants {
    // static BASE_ENDPOINT    = 'http://3.110.202.185:3333/';
    static BASE_ENDPOINT    = 'http://localhost:3333/';
    static CLIENT_ID        = 'demo-client';
    static CLIENT_SECRET    = 'demo-secret';
    // static BASE_MEDIA_URL    = 'http://3.110.202.185:3333/';
    static BASE_MEDIA_URL    = 'http://localhost:3333/';

    static STORAGE_ACCESS_TOKEN     = 'accessToken';
    static STORAGE_REFRESH_TOKEN    = 'refreshToken';
    static STORAGE_USER_INFO        = 'userInfo';
    static STORAGE_USER_SCOPES      = 'userScopes';
    static STORAGE_USER_LOGGED_IN   = 'userLoggedIn';

    // static S3_BUCKET_NAME       = 'backend-starter-bucket';
    // static S3_DIR_NAME          = 'admin-files';
    // static S3_REGION            = 'ap-south-1';
    // static S3_ACCESS_KEY_ID     = '';
    // static S3_ACCESS_KEY_SECRET = '';

    // static S3_FILE_NAME         = (key) => `${+ new Date()}-${key.replace(/[ ,.]/g, "-")}`;
    // static S3_WEB_SETUP_DIR     = (key) => `${this.S3_DIR_NAME}/web-setup/${key.replace(/[ ,.]/g, "-")}`;
    // static S3_BASE_URL          = (key) => `https://backend-starter-bucket.s3.ap-south-1.amazonaws.com/${key}`;

    static AUTH         = this.BASE_ENDPOINT + 'landlord/auth/';
    static UTILITIES    = this.BASE_ENDPOINT + 'landlord/utilities/';

    static LANDLORD_MANAGEMENT  = this.BASE_ENDPOINT + 'landlord/landlord-management/';
 

    static WEEKDAYS = [
        {label: "Weekday", value: ""},
        {label: "Saturday", value: "Saturday"},
        {label: "Sunday", value: "Sunday"},
        {label: "Monday", value: "Monday"},
        {label: "Tuesday", value: "Tuesday"},
        {label: "Wednesday", value: "Wednesday"},
        {label: "Thursday", value: "Thursday"},
        {label: "Friday", value: "Friday"}
    ];

    static STATUS = [
        {label: "Status", value: ""},
        {label: "Available", value: "active"},
        {label: "Unavailable", value: "inactive"},
    ];
}