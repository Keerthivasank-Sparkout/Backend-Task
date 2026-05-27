const getCoursePriceLabel = (price) => {
    if (price === null) {
        return null;
    }

    if (price < 0) {
        return "Invalid Price";
    }

    if (price === 0) {
        return "Free";
    }

    return `₹${price}`;
}

const buildCourseMeta = (title, lessons) => {
    const errors = [];

    let safeTitle = title;

    if (safeTitle === null) {
        errors.push("title is required");
        safeTitle = "Untitled Course";
    }

    let safeLessons = lessons;

    if (safeLessons === null) {
        errors.push("lessons are required");
        safeLessons = [];
    }

    return {
        title: safeTitle,
        lessons: safeLessons,
        totalLessons: safeLessons.length,
        firstLesson: safeLessons[0],
        hasLessons: safeLessons.length > 0,
        errors,
    };
}

module.exports = {
    getCoursePriceLabel,
    buildCourseMeta,
};