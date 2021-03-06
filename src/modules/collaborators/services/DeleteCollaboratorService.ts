import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICollaboratorsRepository } from '../repositories/ICollaboratorsRepository';

@injectable()
class DeleteCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const results = await this.collaboratorRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await this.collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
