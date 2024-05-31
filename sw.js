/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2023/10/21/思维题训练1/index.html","369f7a2cbd02b749c1d69140aae7d0ca"],["/2023/11/09/kmp/index.html","09a61a373b5888727d9c08aa9f7a1bd6"],["/2023/11/09/双指针/index.html","be79964e8360139e1e6c9b92f94a7a0a"],["/2023/11/24/思维题训练5/index.html","095c0b9a16d149c137e773e457d87baf"],["/2024/04/22/cf-global-round-25/index.html","6474d169deb6c503effcdce794a08aa8"],["/2024/05/01/Atcoder351(D-F)题解/index.html","56bd5f3b916ee7b3a9f2739ed609c0f7"],["/2024/05/07/Atcoder352-D-E-题解/index.html","04c81f463a311acffd5e351dfbbccae4"],["/2024/05/31/Codeforces Round 949-(Div.2)B题题解/index.html","7faee6d758ae207337477dbe243d20e9"],["/404.html","d4727eae444976d0d102f929bde3c30b"],["/archives/2023/10/index.html","5356be3f12e37b61c5af07de724f627d"],["/archives/2023/11/index.html","3d7e0237ebf761c68dc7db5bd73527f0"],["/archives/2023/index.html","3bc31066e5e589caca731bff821c6ef6"],["/archives/2024/04/index.html","a506db99a76b61167dcf7ea66ddb2071"],["/archives/2024/05/index.html","51ac8b35dcd2af52b598b8e2431c347e"],["/archives/2024/index.html","32e270d83a4abaa87f83b4e67842b718"],["/archives/index.html","c1ad870b7272641784bbc15bdb0eb332"],["/categories/Atcoder-Beginner-Contest/index.html","c4ccdf76197916e37ccaa21e5cb9d40a"],["/categories/codeforces-1200-1400-训练/index.html","2cb2e24fb7cedae942d8c646f3a7a410"],["/categories/codeforces-rating-1200-1600-思维题训练题解/index.html","fadaa2fd78f72cdc29f64b8612dd0e0f"],["/categories/codeforces/index.html","35e7f60e07e24b75a50b1173511c767a"],["/categories/index.html","972643d9f0e98d14a8cff05e8db093f7"],["/categories/基础算法/index.html","814549b04b325d4329b4333891ebe764"],["/css/gitalk.css","5ce280d86637a41c57fdc51fd463237a"],["/css/highlight-dark.css","0ea5d76d374a283a203564d772ffd935"],["/css/highlight.css","78d82252c6f6f52fe8dc05a9f4d7221a"],["/css/mac.css","b767e9e92dfa6163a6f0f22616daf04a"],["/css/main.css","350133b4a0e813fab97eb95a63030d36"],["/css/mouse.css","f493f0731444ef8dfca3e59fd0fd7ec2"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/background.png","c44ffe429ef6bae488da79c95414be9a"],["/img/default.png","30b942d32fb08f78b649f1d3192f875d"],["/img/fluid.png","b31dbf9d686b7e92b66a8e8381e024e8"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/index.html","97898b034eda836a33fb3212f3795781"],["/js/boot.js","7683fab2fc9d03a3a659aa956b3a54e8"],["/js/color-schema.js","605f587be2ab3d36472bb03ac27ede65"],["/js/events.js","7fa076a71a5559d89af6b0c6dfd3a0d2"],["/js/fireworks.js","812970bf2c6a341762d5d3d831f9bf9b"],["/js/img-lazyload.js","fab30a410e5f490fce3f977a6936a714"],["/js/leancloud.js","fb4a815ccdb5d851d00561dbb62251c4"],["/js/local-search.js","9dc47a0b7b6bacfd16541c9b2b5b6bc5"],["/js/love.js","aeb564b66c9728b2fefa530a8eb6f2b0"],["/js/mouse_move.js","27749fd0751e55bc091be4d96d58c841"],["/js/plugins.js","6c10bee3f659ca91b534bf4a81d62f1e"],["/js/sakura.js","3b952e757cea69441def83d9db9c8d8c"],["/js/utils.js","f7ce9014de1cd7358eeb3aba81c8efe2"],["/links/index.html","8f01f2a4b018683a3d7f1f5b08511f29"],["/sw-register.js","a613571fa3e0d6b85d4c1ba061b1d109"],["/tags/Atcoder/index.html","546c0f7b91fdbbb29d3667913fe420c2"],["/tags/codeforces/index.html","3b91ba5af1f2524a5549d01b7e319d74"],["/tags/index.html","aa943b3c8f6e4b30a680aab22f8b194f"],["/tags/kmp/index.html","ad11ca66f0d260399b55a60001ece865"],["/tags/双指针/index.html","be3365798d78ea2004b3770145a611d3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
