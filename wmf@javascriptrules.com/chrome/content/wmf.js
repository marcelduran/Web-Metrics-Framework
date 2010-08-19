/*global YSLOW, Firebug, content*/
/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, newcap: true, immed: true */

YSLOW.WMF = {};

// Google Web Metrics
// http://code.google.com/speed/articles/web-metrics.html
// last update: 2010-05-26
YSLOW.WMF.metrics = {
    resources: {
        name: ['Resources'],
        category: ['Resources'],
        top: 42.14,
        all: 43.91,
        description: 'Average number of resources per page',
        weight: 2,
        first: true // used to generate summary only once per page
    },
    gets: {
        name: 'GETs',
        category: ['Resources'],
        top: 42.63,
        all: 44.56,
        description: 'Average number of GETs per page. Similar to number of resources, but also includes redirects',
        weight: 3
    },
    hosts: {
        name: 'Hosts',
        category: ['Hosts'],
        top: 8.39,
        all: 7.01,
        description: 'Average number of unique hostnames encountered per page',
        weight: 3
    },
    resourcesPerHost: {
        name: 'Resources Per Host',
        category: ['Resources', 'Hosts'],
        top: 5.02,
        all: 6.26,
        description: 'Average number of resources per host (derived from the \'Resources\' and \'Hosts\' values)',
        weight: 1
    },
    networkSize: {
        name: 'Network Size/KB',
        category: ['Resources', 'Network'],
        top: 312.04,
        all: 320.24,
        description: 'Average size transferred over the network per page, including HTTP headers. If resources were compressed, this would use the compressed size',
        kb: true,
        weight: 3
    },
    documentSize: {
        name: 'Document Size/KB',
        category: ['Resources', 'Network'],
        top: 477.26,
        all: 376.67,
        description: 'Average uncompressed size of a page and its resources, excluding HTTP headers',
        kb: true,
        weight: 2
    },
    zippableSize: {
        name: 'Zippable Size/KB',
        category: ['Resources', 'Network', 'Compression'],
        top: 287.51,
        all: 170.16,
        description: 'Average uncompressed size of the compressible resources on a page, i.e., those with a Content-Type of \'text/*\' or equivalent',
        kb: true,
        weight: 1
    },
    unzippedSize: {
        name: 'Unzipped Size/KB',
        category: ['Resources', 'Network', 'Compression'],
        top: 32.67,
        all: 57.07,
        description: 'Average size of the compressible resources that were not sent compressed, i.e., the Content-Type was \'text/*\', but Content-Encoding did not include \'gzip\' or \'deflate\'',
        kb: true,
        weight: 2
    },
    zippedRatio: {
        name: 'Zipped Ratio',
        category: ['Resources', 'Network', 'Compression'],
        top: 89,
        all: 66,
        description: 'Average percentage of compressible bytes that were actually compressed (derived from the \'Zippable\' and \'Unzipped\' values)',
        perc: true,
        weight: 2
    },
    images: {
        name: 'Images',
        category: ['Resources', 'Images'],
        top: 27.58,
        all: 29.39,
        description: 'Average number of unique images per page',
        weight: 2
    },
    imageSize: {
        name: 'Image Size/KB',
        category: ['Resources', 'Images'],
        top: 184.73,
        all: 205.99,
        description: 'Average network size of the images per page',
        kb: true,
        weight: 2
    },
    scripts: {
        name: 'Scripts',
        category: ['Resources', 'Scripts'],
        top: 6.75,
        all: 7.09,
        description: 'Average number of external scripts per page',
        weight: 2
    },
    scriptSize: {
        name: 'Script Size/KB',
        category: ['Resources', 'Scripts'],
        top: 66.48,
        all: 57.98,
        description: 'Average network size of the external scripts per page',
        kb: true,
        weight: 2
    },
    combinableScripts: {
        name: 'Combinable Scripts',
        category: ['Resources', 'Scripts', 'Hosts'],
        top: 4.75,
        all: 3.75,
        description: 'Average number of requests that could be saved per page if external scripts on the same host were combined',
        weight: 2
    },
    stylesheets: {
        name: 'Stylesheets',
        category: ['Resources', 'Stylesheets'],
        top: 4.07,
        all: 3.22,
        description: 'Average number of external stylesheets per page',
        weight: 2
    },
    stylesheetSize: {
        name: 'Stylesheet Size/KB',
        category: ['Resources', 'Stylesheets'],
        top: 27.17,
        all: 18.72,
        description: 'Average network size of the external stylesheets per page',
        kb: true,
        weight: 2
    },
    combinableStylesheets: {
        name: 'Combinable Stylesheet',
        category: ['Resources', 'Stylesheets', 'Hosts'],
        top: 3.54,
        all: 2.02,
        description: 'Average number of requests that could be saved per page if external stylesheets on the same host were combined',
        weight: 2
    },
    kbPerHost: {
        name: 'KB Per Host',
        category: ['Resources', 'Newtwork', 'Hosts'],
        top: 37.18,
        all: 45.69,
        description: 'Average size transferred over the network per host, including HTTP headers. If resources were compressed, this would use the compressed size.',
        kb: true,
        weight: 2
    },
    kbPerGet: {
        name: 'KB Per GET',
        category: ['Resources'],
        top: 7.32,
        all: 7.19,
        description: 'Average size transferred over the network per GET, including HTTP headers. If resources were compressed, this would use the compressed size.',
        kb: true,
        weight: 3
    },
    getsPerHost: {
        name: 'GETs Per Host',
        category: ['Resources', 'Hosts'],
        top: 5.08,
        all: 6.36,
        description: 'Average number of GETs per host (derived from the \'GETs\' and \'Hosts\' values).',
        weight: 2
    }
};

// ssl metrics
YSLOW.WMF.sslMetrics = {
    hosts: {
        name: 'SSL Hosts',
        top: 6.39,
        all: 3.23,
        description: 'Average number of unique hostnames encountered per SSL page'
    },
    zippableSize: {
        name: 'Zippable Size/KB',
        top: 263.58,
        all: 160.47,
        description: 'Average size of the compressible resources per SSL page'
    },
    unzippedSize: {
        name: 'Unzipped Size/KB',
        top: 133.74,
        all: 89.36,
        description: 'Average size of the compressible resources that were not sent compressed, per SSL page'
    },
    zippedRatio: {
        name: 'Zipped Ratio',
        top: 49,
        all: 44,
        description: 'Average percentage of compressible bytes that were actually compressed, per SSL page (derived from the \'SSL Zippable\' and \'SSL Unzipped\' values)'
    }
};

// percentiles
YSLOW.WMF.percentiles = {
    gets: {
        name: 'GETs Per Page',
        top: {
            mean: 42.63,
            percentiles: [1, 17, 21, 25, 28, 33, 39, 48, 60, 81, 977]
        },
        all: {
            mean: 44.56,
            percentiles: [1, 10, 18, 24, 30, 37, 45, 54, 66, 86, 2758]
        }
    },
    hosts: {
        name: 'Hosts Per Page',
        top: {
            mean: 8.39,
            percentiles: [1, 3, 3, 4, 4, 7, 8, 10, 12, 17, 222]
        },
        all: {
            mean: 7.01,
            percentiles: [1, 1, 2, 3, 4, 5, 7, 8, 10, 14, 374]
        }
    },
    networkSize: {
        name: 'KB Per Page',
        top: {
            mean: 312.04,
            percentiles: [0, 38.15, 80.44, 119.28, 145.51, 176.23, 208.38, 275.48, 377.16, 597.08, 312426.25]
        },
        all: {
            mean: 320.24,
            percentiles: [0, 21.82, 54.15, 90.76, 131.3, 177.47, 234.67, 310.51, 428.73, 663.19, 517026.13]
        },
        kb: true
    },
    kbPerHost: {
        name: 'KB Per Host',
        top: {
            mean: 37.18,
            percentiles: [0, 0.73, 1.76, 3.92, 6.73, 11.18, 17.12, 26.75, 55.45, 132.76, 311872.59]
        },
        all: {
            mean: 45.69,
            percentiles: [0, 0.78, 1.94, 3.6, 6.96, 13.09, 23.97, 44.12, 85.15, 179.08, 441631.71]
        },
        kb: true
    },
    kbPerGet: {
        name: 'KB Per GET',
        top: {
            mean: 7.32,
            percentiles: [0, 0.46, 0.68, 1.06, 1.6, 2.36, 3.19, 4.76, 7.76, 16.75, 14852.58]
        },
        all: {
            mean: 7.19,
            percentiles: [0, 0.43, 0.63, 0.92, 1.31, 1.93, 2.9, 4.38, 7.96, 18.46, 35932.92]
        },
        kb: true
    },
    getsPerHost: {
        name: 'GETs Per Host',
        top: {
            mean: 5.08,
            percentiles: [1, 2.11, 2.88, 3.5, 4.5, 5.62, 6.75, 8, 9.2, 11.25, 401]
        },
        all: {
            mean: 6.36,
            percentiles: [1, 2.33, 3.29, 4.2, 5.14, 6.25, 7.6, 9.33, 12.08, 18, 1045]
        }
    },
    maxGetsPerHost: {
        name: 'Max GETs Per Host',
        top: {
            percentiles: [1, 5, 9, 12, 15, 18, 21, 26, 33, 39, 860]
        },
        all: {
            percentiles: [1, 6, 10, 15, 19, 24, 29, 36, 44, 59, 2754]
        }
    }
};

// generates page summary based on component set provided by YSLOW
YSLOW.WMF.genComponentsSummary = function (cset) {
    try {
        var comp, h, i, data, domains, req, type, uriParts,
            comps = YSLOW.renderer.sortComponents(cset.components, 'type', false),
            len = comps.length,
            hosts = {},
            hostCount = 0,
            reUri = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
            reZippable = /^text\/|^application\/.*(javascript|json|xml).*$/,
            
            summarize = function (type, o) {
                YSLOW.WMF.componentsSummary.types[type] = {
                    count: o.count,
                    size: o.size,
                    sizeCompressed: o.sizeCompressed,
                    zippableSize: o.zippableSize,
                    unzippedSize: o.unzippedSize,
                    hosts: o.hosts,
                    headerSize: o.headerSize,
                    domains: domains,
                    obj: o.obj
                };
            },
            
            reset = function () {
                data = {
                    count: 0,
                    size: 0,
                    sizeCompressed: 0,
                    zippableSize: 0,
                    unzippedSize: 0,
                    hosts: {},
                    headerSize: 0,
                    domains: {},
                    obj: []
                };
                domains = {};
            };

        // initialize
        YSLOW.WMF.componentsSummary = {};
        YSLOW.WMF.componentsSummary.types = {};
        reset();

        for (i = 0; i < len; i += 1) {
            comp = comps[i];
            if (!type) {
                type = comp.type;
            } else if (type !== comp.type) {
                summarize(type, data);
                reset();
                type = comp.type;
            }
            data.count += 1;
            data.size += comp.size;
            data.sizeCompressed += parseInt(comp.size_compressed, 10) || comp.size;
            if (reZippable.test(comp.headers['Content-Type'])) {
                data.zippableSize += comp.size;
                if (!comp.compressed) {
                    data.unzippedSize += comp.size;
                }
            }
            uriParts = reUri.exec(comp.url);
            if (!data.hosts[uriParts[3]]) {
                data.hosts[uriParts[3]] = 1;
            } else {
                data.hosts[uriParts[3]] += 1;
            }
            if (!hosts[uriParts[3]]) {
                hosts[uriParts[3]] = 1;
                hostCount += 1;
            }
            data.headerSize += comp.raw_headers.length;
            req = comp.req_headers;
            for (h in req) {
                if (req.hasOwnProperty(h)) {
                    data.headerSize += h.length + req[h].length;
                }
            }
            data.obj.push(comp);
        }
        if (len) {
            summarize(type, data);
            YSLOW.WMF.componentsSummary.documentHosts = {
                hosts: hosts,
                count: hostCount
            };
        }
    } catch (e) {
        Firebug.Console.log(e);
    }
};

/* get value from type treating when unavailable
 * @type - <string> image, cssimage, js, css, etc
 * @value - <string> | [<string>] count, size, sizeCompressed, etc
 * return - value from type or sum of [values]
 */
YSLOW.WMF.get = function (type, value) {
    var t = YSLOW.WMF.componentsSummary.types[type],
        sum = 0;

    if (value instanceof Array && t) {
        value.forEach(function (v) {
            sum += t[v] || 0;
        });
        
        return sum;
    }

    return t && t[value] || 0;
};

/* generic lint function */
YSLOW.WMF.genericLint = function (doc, cset, config) {
    try {
        var center, color, comp, delta, msg, perc, right, top, score, sum, val,
            left = 0,
            wmf = YSLOW.WMF,
            yu = YSLOW.util,
            rule = config.rule,
            type = config.type,
            metrics = wmf.metrics[rule],
            p = metrics.perc,
            k = metrics.kb,
            ssl = content.location.protocol.indexOf('https') > -1 && wmf.sslMetrics[rule],
            m = (ssl ? ssl[type] : metrics[type]),
            percs = wmf.percentiles[rule] && wmf.percentiles[rule][type].percentiles,
            unit = (k ? 'K' : p ? '%' : '');

        // generate metrics summary
        if (metrics.first) {
            wmf.genComponentsSummary(cset);
        }

        // do some math
        sum = wmf.rules[rule](wmf.componentsSummary) || 0;
        delta = (sum / (k ? 1024 : 1)) - m;
        color = ((!p && delta > 0) || (p && delta < 0) ? 'red' : (!p && delta < 0) || (p && delta > 0) ? 'green' : 'blue');
        score = p ? sum : (100 - (sum / (4 * m * (k ? 1024 : 1)) * 100));

        // set score by percentiles when available
        if (percs) {
            right = percs.length - 1;
            val = (k ? sum / 1024 : sum);

            while (left <= right) {
                center = parseInt((left + right) / 2, 10);
                comp = percs[center];
                if (comp === val || (comp < val && percs[center + 1] > val)) {
                    break;
                }
                if (val < comp) {
                    right = center - 1;
                } else {
                    left = center + 1;
                }
            }
            top = percs[center + 1];
            if (center >= percs.length) {
                center = percs.length - 1;
                top = percs[center];
            }
            score = 100 - ((center + (val - comp) / ((top - comp) || 1)) * 10);
            perc = parseInt(Math.round(100 - score) / 10, 10) * 10;
        }

        // build output message
        msg = 'Total: <span style="color:' + color + ';">' + (k ? yu.kbSize(sum) : (parseInt(sum, 10) === sum ? sum : sum.toFixed(2))) + (p ? '%' : '') + '</span>';
        msg += '<br><span style="text-transform:capitalize;">' + type + '</span> sites average' + (ssl ? ' (SSL)' : '') + ': <span style="color:black;">' + m + unit + '</span>';
        msg += '<br>Delta: <span style="color:' + color + ';">' + (parseInt(delta, 10) === delta ? delta : delta.toFixed(2)) + unit + '</span><br>';
        if (percs) {
            msg += '<br>Percentile: <span style="color:black;">' + (perc === 0 ? 'Min' : perc === 50 ? 'Median' : perc === 100 ? 'Max' : perc) + '</span>';
        }
        msg += '<br>Score: <span style="color:black;">' + Math.round(score) + '</span>';

        return {
            score: (score < 0 ? 0 : score),
            message: msg
        };
    } catch (e) {
        Firebug.Console.log(e);
    }
};

/* generic rule generator
 * @rule - <string> rule name from metrics
 * @type - <string> top | all
 * @calc - <function> rule calculation function 
 * return - YSLOW rule object
 */
YSLOW.WMF.generateRule = function (rule, type) {
    var rst,
        wmf = YSLOW.WMF,
        metrics = wmf.metrics[rule],
        id = 'wmf-' + type + '-' + rule;

    // add rule info into ruleset 
    wmf.ruleset = wmf.ruleset || {};
    rst = wmf.ruleset[type] = wmf.ruleset[type] || {};
    rst.rules = rst.rules || {};
    rst.rules[id] = {};
    rst.weights = rst.weights || {};
    rst.weights[id] = metrics.weight;

    return {
        id: id,
        name: metrics.name,
        info: metrics.description,
        category: metrics.category,
        config: {
            rule: rule,
            type: type
        },
        lint: YSLOW.WMF.genericLint
    };
};

// lint rules
YSLOW.WMF.rules = {
    resources: function () {
        var get = YSLOW.WMF.get;

        return get('doc', 'count') +
            get('js', 'count') +
            get('css', 'count') +
            get('iframe', 'count') +
            get('flash', 'count') +
            get('cssimage', 'count') +
            get('image', 'count') +
            get('favicon', 'count') +
            get('xhr', 'count') +
            get('font', 'count');
    },
    gets: function () {
        var wmf = YSLOW.WMF;

        return wmf.rules.resources() + wmf.get('redirect', 'count');
    },
    hosts: function () {
        return YSLOW.WMF.componentsSummary.documentHosts.count;
    },
    resourcesPerHost: function () {
        var rules = YSLOW.WMF.rules;

        return rules.resources() / rules.hosts();
    },
    networkSize: function () {
        var get = YSLOW.WMF.get;

        return get('doc', ['sizeCompressed', 'headerSize']) +
            get('js', ['sizeCompressed', 'headerSize']) +
            get('css', ['sizeCompressed', 'headerSize']) +
            get('iframe', ['sizeCompressed', 'headerSize']) +
            get('flash', ['sizeCompressed', 'headerSize']) +
            get('cssimage', ['sizeCompressed', 'headerSize']) +
            get('image', ['sizeCompressed', 'headerSize']) +
            get('favicon', ['sizeCompressed', 'headerSize']) +
            get('xhr', ['sizeCompressed', 'headerSize']) +
            get('redirect', ['sizeCompressed', 'headerSize']) + 
            get('font', ['sizeCompressed', 'headerSize']);
    },
    documentSize: function () {
        var get = YSLOW.WMF.get;

        return get('doc', 'size') +
            get('js', 'size') +
            get('css', 'size') +
            get('iframe', 'size') +
            get('flash', 'size') +
            get('cssimage', 'size') +
            get('image', 'size') +
            get('favicon', 'size') +
            get('xhr', 'size') +
            get('redirect', 'size') + 
            get('font', 'size');
    },
    zippableSize: function () {
        var get = YSLOW.WMF.get;

        return get('doc', 'zippableSize') +
            get('js', 'zippableSize') +
            get('css', 'zippableSize') +
            get('xhr', 'zippableSize') +
            get('redirect', 'zippableSize') + 
            get('font', 'zippableSize');
    },
    unzippedSize: function () {
        var get = YSLOW.WMF.get;

        return get('doc', 'unzippedSize') +
            get('js', 'unzippedSize') +
            get('css', 'unzippedSize') +
            get('xhr', 'unzippedSize') +
            get('redirect', 'unzippedSize') + 
            get('font', 'unzippedSize');
    },
    zippedRatio: function () {
        var rules = YSLOW.WMF.rules,
            zippableSize = rules.zippableSize();

        return zippableSize ? ((1 - rules.unzippedSize() / zippableSize) * 100) : 100;
    },
    images: function () {
        var get = YSLOW.WMF.get;

        return get('cssimage', 'count') + get('image', 'count');
    },
    imageSize: function () {
        var get = YSLOW.WMF.get;

        return get('cssimage', 'size') + get('image', 'size');
    },
    scripts: function () {
        return YSLOW.WMF.get('js', 'count');
    },
    scriptSize: function () {
        return YSLOW.WMF.get('js', 'size');
    },
    combinableTypes: function (type) {
        var h,
            savings = 0,
            hosts = YSLOW.WMF.get(type, 'hosts');

        for (h in hosts) {
            if (hosts.hasOwnProperty(h)) {
                savings += (hosts[h] - 1);
            }
        }

        return savings;
    },
    combinableScripts: function () {
        return YSLOW.WMF.rules.combinableTypes('js');
    },
    stylesheets: function () {
        return YSLOW.WMF.get('css', 'count');
    },
    stylesheetSize: function () {
        return YSLOW.WMF.get('css', 'size');
    },
    combinableStylesheets: function () {
        return YSLOW.WMF.rules.combinableTypes('css');
    },
    kbPerHost: function () {
        var rules = YSLOW.WMF.rules;

        return rules.networkSize() / rules.hosts();
    },
    kbPerGet: function () {
        var rules = YSLOW.WMF.rules;

        return rules.networkSize() / rules.gets();
    },
    getsPerHost: function () {
        var rules = YSLOW.WMF.rules;

        return rules.gets() / rules.hosts();
    }
};

// Generate YSLOW rules
(function () {
    var metric,
        wmf = YSLOW.WMF,
        metrics = wmf.metrics;

    for (metric in metrics) {
        if (metrics.hasOwnProperty(metric)) {
            YSLOW.registerRule(wmf.generateRule(metric, 'top'));
            YSLOW.registerRule(wmf.generateRule(metric, 'all'));
        }
    }
}());

// Top Sites Ruleset
YSLOW.registerRuleset({
    id: 'wmf-top',
    name: 'Web Metrics Framework - Top Sites',
    rules: YSLOW.WMF.ruleset.top.rules,
    weights: YSLOW.WMF.ruleset.top.weights
});

// All Sites Ruleset
YSLOW.registerRuleset({
    id: 'wmf-all',
    name: 'Web Metrics Framework - All Sites',
    rules: YSLOW.WMF.ruleset.all.rules,
    weights: YSLOW.WMF.ruleset.all.weights
});
