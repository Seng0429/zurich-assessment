import 'server-only';

export const maskEmail = (email: string): string => {
    const [name, domain] = email.split('@');

    if (!domain) return '***';
    const maskedName = name.length > 2 ? name.substring(0, 2) + '***' : '***';
        
    return `${maskedName}@${domain}`;
};

export const matchUserInitials = (firstName: string, lastName: string, firstNameLetter: string, lastNameLetter: string): boolean => {
    const fLetter = firstNameLetter.trim().toLowerCase();
    const lLetter = lastNameLetter.trim().toLowerCase();

    const userFirstName = firstName.trim().toLowerCase();
    const userLastName = lastName.trim().toLowerCase();

    const matchesFirst = fLetter !== '' && userFirstName.startsWith(fLetter);
    const matchesLast = lLetter !== '' && userLastName.startsWith(lLetter);

    return matchesFirst || matchesLast;
};
