let isTyping = false
const COMMENT_INPUT_ARIA_LABEL = 'Add a comment…'

function handleKeyDownAndKeyUp(event, typingStatus = false) {
    const tag = event.target
    const ariaLabel = tag.getAttribute('aria-label')
    if (ariaLabel === COMMENT_INPUT_ARIA_LABEL) {
        console.log({ isInFocus: tag === document.activeElement, isTyping })
        isTyping = typingStatus;
    } else {
        isTyping = false;
    }
}

document.addEventListener('keydown', (event) => handleKeyDownAndKeyUp(event, true));

document.addEventListener('keyup', (event) => handleKeyDownAndKeyUp(event, false));


function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getSvg(ariaLabel = null) {
    if (ariaLabel == null) {
        return null;
    }
    const elements = document.querySelectorAll(`svg[aria-label="${ariaLabel}"]`)
    for (const element of elements) {
        if (isElementInViewport(element)) {
            return element;
        }
    }
    return null;
}

function handleLikeUnlike() {
    const likeElement = getSvg('Like');
    const unLikeElement = getSvg('Unlike');
    const element = unLikeElement || likeElement;

    if (!element) {
        return;
    }

    const parentElement = element.parentElement;

    if (
        parentElement &&
        parentElement.click &&
        typeof parentElement.click === 'function'
    ) {
        parentElement.click();
    }
}

function openCommentSection() {
    const commentSvgElement = getSvg('Comment');
    commentSvgElement?.parentElement?.click();
}

function openShareMenu() {
    const shareSvgElement = getSvg('Direct');
    shareSvgElement?.parentElement?.click();
}

function saveReelMenu() {
    const saveSvgElement = getSvg('Save') || getSvg('Remove');
    saveSvgElement?.parentElement?.click();
}

function muteUnmute() {
    const muteUnmuteElement =
        getSvg('Audio is playing') || getSvg('Audio is muted');
    if (!muteUnmuteElement) {
        return;
    }
    muteUnmuteElement?.parentElement?.click();
}

const validKeys = {
    'l': handleLikeUnlike,
    'c': openCommentSection,
    's': openShareMenu,
    'S': saveReelMenu,
    'm': muteUnmute,
};

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (isTyping) {
        return;
    }
    if (validKeys[key]) {
        const handler = validKeys[event.key];
        if (handler && typeof handler === 'function') {
            handler();
        }
    }
});
