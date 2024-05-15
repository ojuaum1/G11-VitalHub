import * as Notifications from 'expo-notifications';

export const PatientCancelNotify = async (doctorName, consultationSpecialty, consultationDate, consultationTime) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Consulta Cancelada',
            body: `Você cancelou a consulta de ${consultationSpecialty} com o doutor ${doctorName}, no dia ${consultationDate} às ${consultationTime}.`
        },
        trigger: null
    });
}

export const PatientCreateScheduleNotify = async (doctorName, consultationSpecialty, consultationDate, consultationTime) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Consulta Agendada',
            body: `Você agendou uma consulta de ${consultationSpecialty} com o doutor ${doctorName}, no dia ${consultationDate} às ${consultationTime}.`
        },
        trigger: null
    });
}

export const DoctorCancelNotify = async (patientName, consultationDate, consultationTime) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Consulta Cancelada',
            body: `Você cancelou a consulta com ${patientName}, do dia ${consultationDate} às ${consultationTime}.`
        },
        trigger: null
    });
}