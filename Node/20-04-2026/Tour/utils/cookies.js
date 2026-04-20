const { createAccessToken, createRefreshToken, createCsrfToken } = require("./jwt");
const { HttpStatus } = require("./http");
const { userMessage } = require("./message");
const { ErrorResponse } = require("./response");

const ACCESS_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';
const CSRF_COOKIE = 'csrf_token';

const COOKIE_SECURE = process.env.COOKIE_SECURE;
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE;

function parseCookieSecure(value) {
    return value === 'true';
}

function parseSameSite(value) {
    const normalized = value?.toLowerCase();
    if (normalized === 'strict' || normalized === 'lax' || normalized === 'none') {
        return normalized;
    }
    return 'lax';
}

function createCookieOptions(maxAge) {
    return {
        httpOnly: true,
        secure: parseCookieSecure(COOKIE_SECURE),
        sameSite: parseSameSite(COOKIE_SAME_SITE),
        path: '/',
        maxAge
    }
}
function createCsrfOptions(maxAge) {
    return {
        httpOnly: false,
        secure: parseCookieSecure(COOKIE_SECURE),
        sameSite: parseSameSite(COOKIE_SAME_SITE),
        path: '/',
        maxAge
    }
}

exports.setAuthCookies = (res, userId, role) => {
    const access_token = createAccessToken(userId, role);
    const refresh_token = createRefreshToken(userId, role);
    const csrf_token = createCsrfToken();
    const accessMaxAge = 15 * 60 * 1000;
    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;
    res.cookie(ACCESS_COOKIE, access_token, createCookieOptions(accessMaxAge));
    res.cookie(REFRESH_COOKIE, refresh_token, createCookieOptions(refreshMaxAge));
    res.cookie(CSRF_COOKIE, csrf_token, createCsrfOptions(refreshMaxAge));
}

exports.clearAuthCookie = (res)=>{
    const clearCookieOption={
        secure: parseCookieSecure(COOKIE_SECURE),
        sameSite: parseSameSite(COOKIE_SAME_SITE),
        path:'/'
    }
    res.clearCookie(ACCESS_COOKIE,clearCookieOption)
    res.clearCookie(REFRESH_COOKIE,clearCookieOption)
    res.clearCookie(CSRF_COOKIE,clearCookieOption)
}

exports.requireCsrf = (req,res,next)=>{
    const csrfCookie = req.cookies?.[CSRF_COOKIE];
    const csrfHeader = req.header('x-csrf-token');

    if(!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader){
        return ErrorResponse(
            res,
            HttpStatus.FORBIDDEN,
            userMessage.UNAUTHORIZED,
            "CSRF token required"
        );
    }
    next();
}
