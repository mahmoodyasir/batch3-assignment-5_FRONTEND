export type ServiceData = {
    _id?: string,
    name: string,
    description: string,
    price: number,
    duration: number,
    isDeleted?: boolean,
}

export type SlotFormData = {
    service: string;
    date: string;
    startTime: string;
    endTime: string;
}


export const calculateTimeLeft = (date: string, startTime: string) => {
    const eventTime = new Date(`${date}T${startTime}`).getTime();
    const currentTime = new Date().getTime();
    const difference = eventTime - currentTime;

    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};
