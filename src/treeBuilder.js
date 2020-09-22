export default (dat1, dat2) => {

    const concatedKeys = [...Object.keys(dat1).sort(), ...Object.keys(dat2).sort()];
    const uniqKeys = [...new Set(concatedKeys)];

    const treeEl = uniqKeys.reduce((acc, el) => {

        if (Object.prototype.hasOwnProperty.call(dat1, el)
                    && Object.prototype.hasOwnProperty.call(dat2, el)) {
             dat1[el] === dat2[el]
            ? acc['same'] ? acc['same'][el] = dat1[el] : acc['same'] = {[el] : dat1[el]}
            : acc['changed'] ? acc['changed'][el] = [dat1[el], dat2[el]] : acc['changed'] = {[el]: [dat1[el], dat2[el]]};
        }

        if (!Object.prototype.hasOwnProperty.call(dat1, el)) {
            acc['added'] ? acc['added'][el] = dat2[el] : acc['added'] = {[el]: dat2[el]};
        }

        if (Object.prototype.hasOwnProperty.call(dat1, el) && !Object.prototype.hasOwnProperty.call(dat2, el)) {
            acc['deleted'] ? acc['deleted'][el] = dat1[el] : acc['deleted'] = {[el]: dat1[el]};
        }

        return acc;
    }, {});

    return Array(treeEl);
};
