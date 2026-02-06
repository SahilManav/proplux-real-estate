import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE Review (or Testimonial)
export const createReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    // Validate input
    if (!userId || !rating || !comment) {
      return res.status(400).json({ message: 'User ID, rating, and comment are required.' });
    }

    // Create the review
    const newReview = await prisma.review.create({
      data: {
        userId,
        rating: parseInt(rating), // Ensure rating is an integer
        comment,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET all Reviews (or Testimonials)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true, // Include user information (if needed)
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET a single Review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id: id },
      include: {
        user: true
      }
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review by ID", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// UPDATE Review (or Testimonial)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required for updating.' });
    }

    const updatedReview = await prisma.review.update({
      where: { id: id },
      data: {
        rating: parseInt(rating),
        comment,
      },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE Review (or Testimonial)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id: id },
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
