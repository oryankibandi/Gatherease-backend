import { Request, Response } from 'express';
import { ServiceError } from '../../services/exceptions';
import { organizerAuthService } from '../../services/organizer';
import { venueService } from '../../services/venue';
import { codeGenerator } from '../../utils';

export async function createVenue(req: Request, res: Response) {
    try {
        const organizerId = req.user.id; // assuming that you have implemented an authentication middleware to attach the user object to the request
        const organizer = await organizerAuthService.getOrganizerById(organizerId); // assuming that you have implemented a service function to get an organizer by ID

        if (!organizer) {
            return res.status(404).json({
                message: 'Organizer not found',
            });
        }

        const newVenue = await venueService.createVenue({
            ...req.body,
            organizerId,
        });

        return res.status(201).json({
            message: 'Venue created successfully',
            data: codeGenerator.filterObject(newVenue, { exclude: ['id', 'organizerId'] }),
        });
    } catch (error) {
        if (error instanceof ServiceError) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}
